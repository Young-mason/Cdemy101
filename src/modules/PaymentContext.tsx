import React, { useReducer, useContext, createContext, Dispatch } from "react";

// 결제목록에 들어갈 아이템의 타입 선언
type Item = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  availableCoupon?: boolean;
};

export type PaymentState = Item[];

const PaymentStateContext = createContext<PaymentState | undefined>(undefined);

type Action =
  | { type: "ADD_TO_PAYMENT"; item: Item }
  | { type: "DELETE_FROM_PAYMENT"; id: string };

type PaymentDispatch = Dispatch<Action>;

const PaymentDispatchContext = createContext<PaymentDispatch | undefined>(
  undefined
);

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
