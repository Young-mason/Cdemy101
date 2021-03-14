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

  /* 가격 계산기 */
  useEffect(() => {
    // 쿠폰 없는 경우
    if (!coupon) {
      let sum = getSum(paymentList);
      setTotalPrice(sum);
    }

    //쿠폰 있는경우
    else {
      const { type, discountRate, discountAmount } = JSON.parse(coupon);
      const couponAvailableItems = paymentList.filter(
        (el) => el.availableCoupon === undefined
      );
      const others = paymentList.filter((el) => el.availableCoupon === false);

      // ! 소수점 버림처리 필요
      if (type === "rate") {
        let couponAvailableSum =
          (getSum(couponAvailableItems) * (100 - discountRate)) / 100;
        let elseSum = getSum(others);

        setTotalPrice(couponAvailableSum + elseSum);
      }
      if (type === "amount") {
        let couponAvailableSum = getSum(couponAvailableItems) - discountAmount;
        let elseSum = getSum(others);

        setTotalPrice(couponAvailableSum + elseSum);
      }
    }
  }, [coupon, paymentList]);

  useEffect(() => {
    if (coupon) {
      setMessageOn(true);
      setTimeout(() => {
        setMessageOn(false);
      }, 3000);
    }
  }, [coupon]);
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
          // 선택한 쿠폰을 State에 저장하고, 현재 메세지가 있다면 삭제합니다.
          onChange={(e) => {
            setSelect(e.target.value);
            setMessageOn(false);
          }}
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
            setCoupon(select);
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
