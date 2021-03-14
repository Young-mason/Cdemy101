import React, { useReducer, useContext, createContext, Dispatch } from "react";

/* 장바구니에 들어갈 아이템의 타입을 선언합니다 */
export type Item = {
  id: string;
  title: string;
  coverImage: string;
  price: number;
  score: number;
  availableCoupon?: boolean;
};

/* 장바구니 목록의 타입을 선언합니다 */
type CartState = Item[];

/* Generic을 사용하여 Context에서 관리할 값의 상태를 지정해줍니다 */
const CartStateContext = createContext<CartState | undefined>(undefined);

/* 액션 타입을 지정합니다 */
type Action =
  | { type: "ADD_TO_CART"; item: Item }
  | { type: "REMOVE_FROM_CART"; id: string };

/* 디스패치 함수의 타입을 설정합니다 */
type CartDispatch = Dispatch<Action>;

/* 컨텍스트를 만듭니다. 추후 컴포넌트에서 액션을 디스패치 할 때 액션들에 대한 타입을 검사 할 수 있습니다 */
const CartDispatchContext = createContext<CartDispatch | undefined>(undefined);

/* 리듀서 */
function cartReducer(state: CartState, action: Action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.item];
    case "REMOVE_FROM_CART":
      return state.filter((el) => el.id !== action.id);
    default:
      throw new Error("unhandled action");
  }
}

/* CartStateContext 와 CartDispatchContext의 Provider를 함께 사용하는 CartProvider를 만듭니다 */
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
  ]);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={cart}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
}

/* 
cart의 타입은 cartState | undefined일 수도 있습니다. 
따라서 해당 배열을 사용하기 전, 유효한지 체크 필요하므로
customHook를 만듭니다 
*/
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
