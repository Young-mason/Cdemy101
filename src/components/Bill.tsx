import { coupons } from "../productItems";
import { usePaymentState } from "../modules/PaymentContext";
import { useState, useEffect } from "react";
import { BillProps } from "../modules/interface";
import pointer from "../modules/pointer";
import getSum from "../modules/getSum";
import "../style/Bill.css";

function Bill({ coupon, setCoupon }: BillProps) {
  const [totalPrice, setTotalPrice] = useState(0);
  const [messageOn, setMessageOn] = useState(false);
  const [select, setSelect] = useState("");
  const paymentList = usePaymentState();

  /* 선택된 상품들의 가격을 계산합니다 */
  useEffect(() => {
    // 쿠폰 적용이 안된 경우 결제목록에 있는 상품 가격을 모두 더합니다
    if (!coupon) {
      let sum = getSum(paymentList);
      setTotalPrice(Math.floor(sum));
    }

    // 쿠폰이 적용된 경우 쿠폰 적용 가능한 상품과 불가능한 상품을 구분하여 계산합니다
    else {
      const { type, discountRate, discountAmount } = JSON.parse(coupon);
      const couponAvailableItems = paymentList.filter(
        (el) => el.availableCoupon === undefined
      );
      const others = paymentList.filter((el) => el.availableCoupon === false);

      if (type === "rate") {
        let couponAvailableSum =
          (getSum(couponAvailableItems) * (100 - discountRate)) / 100;
        let elseSum = getSum(others);

        setTotalPrice(Math.floor(couponAvailableSum + elseSum));
      }
      if (type === "amount") {
        let couponAvailableSum = getSum(couponAvailableItems) - discountAmount;
        let elseSum = getSum(others);

        setTotalPrice(Math.floor(couponAvailableSum + elseSum));
      }
    }
  }, [coupon, paymentList]);

  /* 쿠폰 적용 버튼을 누르면, 메세지가 3초간 출력되고 사라집니다 */
  useEffect(() => {
    if (coupon) {
      setMessageOn(true);
      setTimeout(() => {
        setMessageOn(false);
      }, 3000);
    }
  }, [coupon]);

  /* 선택한 쿠폰을 State에 임시 저장하고, 현재 메세지가 있다면 삭제합니다. */
  const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(e.target.value);
    setMessageOn(false);
  };

  return (
    <div className="bill-container">
      <div className="bill-main">
        <h3>Total : </h3>
        <span className="bill-price">{`₩ ${pointer(totalPrice)}`}</span>
        <button className="checkout-btn">checkout</button>
      </div>
      <div className="bill-coupon">
        <select
          name="coupon"
          id="selector"
          className="coupon-select"
          onChange={onChangeHandler}
        >
          <option value="">쿠폰을 선택해주세요</option>
          {coupons.map((coupon) => (
            <option key={coupon.type} value={JSON.stringify(coupon)}>
              {coupon.title}
            </option>
          ))}
        </select>
        <button
          id="apply-btn"
          className="coupon-select"
          onClick={() => {
            setCoupon(select); /* 쿠폰을 적용시킵니다 */
          }}
        >
          Apply
        </button>
        {messageOn ? (
          <p className="coupon-script">
            <strong>"{JSON.parse(coupon).title}"</strong>이 적용되었습니다
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Bill;
