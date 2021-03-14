import { PaymentState } from "./PaymentContext";

/* 결제 목록에서 상품의 수량과 가격을 받아 합산합니다 */
const getSum = (paymentList: PaymentState) => {
  return paymentList.reduce((acc, cur) => {
    let { price, quantity } = cur;
    return acc + price * quantity;
  }, 0);
};

export default getSum;
