import { useState, useEffect } from "react";
import { CartItemsProps } from "../modules/interface";
import pointer from "../modules/pointer";
import "../style/CartItems.css";

function CartItems({
  coverImage,
  title,
  price,
  availableCoupon,
  coupon,
  couponApplied,
}: CartItemsProps) {
  const [couponBadge, setCouponBadge] = useState("");
  useEffect(() => {
    console.log(coupon);
    if (coupon.length > 0) {
      const couponData = JSON.parse(coupon);
      setCouponBadge(couponData.title.split(" ").slice(0, 2).join(" "));
    }
  }, [couponApplied]);

  // const couponBadge: string =
  //   coupon.length > 0
  //     ? JSON.parse(coupon).title.split(" ").slice(0, 2).join(" ")
  //     : "";

  return (
    <div className="cart-item">
      <img src={coverImage} alt="no-img" />
      <div className="cart-item-body">
        <p className="cart-item-title">{title}</p>
        <h5 className="cart-item-price">{
          `₩ ${pointer(price)}` /* 세 자리수 마다 콤마 찍기 */
        }</h5>
      </div>
      <div className="cart-btns">
        <a className="delete">삭제하기</a>
        <div
          className="coupon"
          style={
            couponApplied && availableCoupon !== false ? { opacity: 1 } : {}
          }
        >
          {couponBadge}
        </div>
      </div>
    </div>
  );
}

export default CartItems;
