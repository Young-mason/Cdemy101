import { coupons } from "../productItems";
import { useState, useEffect, useRef } from "react";
import "../style/Bill.css";

function Bill() {
  const [coupon, setCoupon] = useState("");
  const [messageOn, setMessageOn] = useState(false);

  return (
    <div className="bill-container">
      <div className="bill-main">
        <h3>Total : </h3>
        <span className="bill-price">₩ 504,000</span>
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
            <option key={coupon.type} value={coupon.title}>
              {coupon.title}
            </option>
          ))}
        </select>
        <button
          id="apply-btn"
          className="coupon-select"
          onClick={() => {
            // 선택한 쿠폰을 적용하고 3초간 메세지를 띄웁니다.
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
            <strong>"{coupon}"</strong>이 적용되었습니다
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Bill;
