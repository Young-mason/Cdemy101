import React, { useReducer, useContext, createContext, Dispatch } from "react";
import { productItems } from "../productItems";

// 카트에 들어갈 아이템의 타입 선언
type Item = {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
};

// 카트 타입 선언
type CartState = Item[];

// Generic을 사용하여 Context에서 관리할 값의 상태를 정해줌
const CartStateContext = createContext<CartState | undefined>(undefined);

// 액션을 위한 타입 선언
type Action =
  | { type: "ADD_TO_CART"; item: Item }
  | { type: "REMOVE_FROM_CART"; id: string }
  | { type: "APPLY_RATE_COUPON"; rate: number }
  | { type: "APPLY_AMOUNT_COUPON"; amount: number }
  | { type: "DELETE_COUPON" };

// 디스패치 함수의 타입 설정
type CartDispatch = Dispatch<Action>;

// 추후 컴포넌트에서 액션을 디스패치 할 때 액션들에 대한 타입을 검사 할 수 있음
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined);

// 리듀서
function cartReducer(state: CartState, action: Action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.item];
    case "REMOVE_FROM_CART":
      return state.filter((el) => el.id !== action.id);
    case "APPLY_RATE_COUPON":
      return state.map((el) => {
        const discount = (el.price * (100 - action.rate)) / 100;
        //쿠폰 적용 가능여부 확인 후 가능할 경우만 할인 적용
        return el.availableCoupon !== false ? { ...el, price: discount } : el;
      });
    case "APPLY_AMOUNT_COUPON":
      return state.map((el) => {
        //쿠폰 적용 가능여부 확인 후 가능할 경우만 할인 적용
        return el.availableCoupon !== false
          ? { ...el, price: el.price - action.amount }
          : el;
      });
    case "DELETE_COUPON":
      return state.map((el) => {
        let price = 0;
        productItems.forEach((item) => {
          if (el.id === item.id) {
            price = item.price;
          }
        });
        return { ...el, price };
      });
    default:
      throw new Error("unhandled action");
  }
}

//CartStateContext 와 CartDispatchContext의 Provider를 함께 사용하는 CartProvider만들기
export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cart, dispatch] = useReducer(cartReducer, [
    {
      id: "81x83ysiEHsHCBoeVh2O",
      title: "글씨가 주는 소소한 행복, Lettering Together!",
      coverImage:
        "https://cdn.class101.net/images/ec0f0c15-aeec-43a3-a0c9-b649b0999f0a",
      price: 320000,
      score: 300,
    },
    {
      id: "ZXV8mCcvbpXKm5J5snUq",
      title: "붓펜으로 그려낸 보통날, 보통의 글씨",
      coverImage:
        "https://cdn.class101.net/images/a363a069-5aaf-40cb-822e-a2cab585c37e",
      price: 240000,
      score: 350,
    },
    {
      id: "tpP45lSwqf1X1yEEFqL4",
      title: "수놓는 발바닥과 함께 하는 꽁냥꽁냥 고양이 자수",
      coverImage:
        "https://cdn.class101.net/images/e6b7bde6-b23d-447f-9cdf-3879caf7eb13",
      price: 90000,
      score: 120,
      availableCoupon: false,
    },
  ]);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

// cart의 타입은 cartState | undefined일 수도 있음. 따라서 해당 배열을 사용하기 전, 유효한지 체크 필요  --> customHook 만들기
export function useCartState() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error("CartProvider not found");
  return state;
}

export function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error("CartProvider not found");
  return dispatch;
}
