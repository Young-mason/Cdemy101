import { coupons } from "../productItems";
import { useCartDispatch, useCartState } from "../modules/CartContext";
import { useState, useEffect } from "react";
import { BillProps } from "../modules/interface";
import pointer from "../modules/pointer";
import "../style/Bill.css";

function Bill({
  coupon,
  setCoupon,
  couponApplied,
  setCouponApplied,
  totalPrice,
}: BillProps) {
  const [messageOn, setMessageOn] = useState(false);
  const dispatch = useCartDispatch();
  const cartItems = useCartState();

  /* 쿠폰 값이 변화하면 적용상태를 해제시킨다. */
  useEffect(() => {
    setCouponApplied(false);
    // dispatch({ type: "DELETE_COUPON" });
  }, [coupon]);

  const applyCoupon = () => {
    // 적용한 쿠폰을 현재 카트 리스트에 적용시킨다 (redux)
    // !전체 금액에 대해 적용하도록 수정할것
    const { type, discountRate, discountAmount } = JSON.parse(coupon);
    if (type === "rate") {
      dispatch({ type: "APPLY_RATE_COUPON", rate: discountRate });
    }
    if (type === "amount") {
      dispatch({ type: "APPLY_AMOUNT_COUPON", amount: discountAmount });
    }
  };

  console.log(couponApplied);
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
            setCoupon(e.target.value);
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
            if (couponApplied) {
              dispatch({ type: "DELETE_COUPON" });
            }
            // 선택한 쿠폰을 적용하고 3초간 메세지를 띄웁니다.
            applyCoupon();
            setCouponApplied(true);
            if (coupon.length !== 0) {
              setMessageOn(true);
              setTimeout(() => {
                setMessageOn(false);
              }, 3000);
            }
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
