import { PaymentState } from "./PaymentContext";

const getSum = (paymentList: PaymentState) => {
  return paymentList.reduce((acc, cur) => {
    let { price, quantity } = cur;
    return acc + price * quantity;
  }, 0);
};

export default getSum;
