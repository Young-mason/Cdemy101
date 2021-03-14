import React, { useReducer, useContext, createContext, Dispatch } from "react";

/* 결제목록에 들어갈 아이템의 타입을 선언합니다 */
type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  availableCoupon?: boolean;
};

/* 장바구니 목록의 타입을 선언합니다 */
export type PaymentState = Item[];

/* Generic을 사용하여 Context에서 관리할 값의 상태를 지정해줍니다 */
const PaymentStateContext = createContext<PaymentState | undefined>(undefined);

/* 액션 타입을 지정합니다 */
type Action =
  | { type: "ADD_TO_PAYMENT"; item: Item }
  | { type: "DELETE_FROM_PAYMENT"; id: string };

/* 디스패치 함수의 타입을 설정합니다 */
type PaymentDispatch = Dispatch<Action>;

/* 컨텍스트를 만듭니다. 추후 컴포넌트에서 액션을 디스패치 할 때 액션들에 대한 타입을 검사 할 수 있습니다 */
const PaymentDispatchContext = createContext<PaymentDispatch | undefined>(
  undefined
);

/* 리듀서 */
function paymentReducer(state: PaymentState, action: Action) {
  switch (action.type) {
    case "ADD_TO_PAYMENT":
      return [...state, action.item];
    case "DELETE_FROM_PAYMENT":
      return state.filter((el) => el.id !== action.id);
    default:
      throw new Error("unhandled action");
  }
}

/* PaymentStateContext 와 PaymentDispatchContext의 Provider를 함께 사용하는 PaymentProvider를 만듭니다 */
export function PaymentContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [payment, dispatch] = useReducer(paymentReducer, []);
  return (
    <PaymentDispatchContext.Provider value={dispatch}>
      <PaymentStateContext.Provider value={payment}>
        {children}
      </PaymentStateContext.Provider>
    </PaymentDispatchContext.Provider>
  );
}

/* 
Payment의 타입은 PaymentState | undefined일 수도 있습니다. 
따라서 해당 배열을 사용하기 전, 유효한지 체크 필요하므로
customHook를 만듭니다 
*/
export function usePaymentState() {
  const state = useContext(PaymentStateContext);
  if (!state) throw new Error("PaymentProvider not found");
  return state;
}

export function usePaymentDispatch() {
  const dispatch = useContext(PaymentDispatchContext);
  if (!dispatch) throw new Error("PaymentProvider not found");
  return dispatch;
}
