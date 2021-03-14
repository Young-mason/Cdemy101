import { useState, useEffect } from "react";
import { useCartDispatch } from "../modules/CartContext";
import { CartItemsProps } from "../modules/interface";
import { FiPlus, FiMinus } from "react-icons/fi";
import pointer from "../modules/pointer";
import "../style/CartItems.css";

function CartItems({
  id,
  coverImage,
  title,
  price,
  availableCoupon,
  coupon,
  couponApplied,
}: CartItemsProps) {
  const [quantity, setQuantity] = useState(1);
  // const [multipliedPrice, setMultipliedPrice] = useState(price);
  const [couponBadge, setCouponBadge] = useState("");
  const dispatch = useCartDispatch();
  useEffect(() => {
    if (coupon.length > 0) {
      const couponData = JSON.parse(coupon);
      setCouponBadge(couponData.title.split(" ").slice(0, 2).join(" "));
    }
  }, [couponApplied]);

  useEffect(() => {
    // dispatch({ type: "DELETE_COUPON" });
    dispatch({ type: "MULTIPLY_PRICE", id, quantity });
  }, [quantity]);

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
        <div className="quantity">
          <button
            id="minus"
            className="quantity-btn"
            onClick={() => {
              if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <FiMinus />
          </button>
          <span>수량: {quantity}</span>
          <button
            id="plus"
            className="quantity-btn"
            onClick={() => {
              if (quantity >= 5) {
                alert("5개 까지만 구매하실 수 있습니다");
              } else {
                setQuantity(quantity + 1);
              }
            }}
          >
            <FiPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
