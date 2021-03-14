import { useState, useEffect } from "react";
import { CartItemsProps } from "../modules/interface";
import { usePaymentDispatch } from "../modules/PaymentContext";
import { useCartDispatch } from "../modules/CartContext";
import { FiPlus, FiMinus } from "react-icons/fi";
import pointer from "../modules/pointer";
import "../style/CartItems.css";

function CartItems({
  id,
  coverImage,
  title,
  price,
  availableCoupon,
}: CartItemsProps) {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);
  const paymentDispatch = usePaymentDispatch();
  const cartDispatch = useCartDispatch();

  /* 체크 박스 상태에 따라 가격을 계산 목록에 추가하거나 제거합니다 */
  useEffect(() => {
    const item = {
      id,
      title,
      price,
      quantity,
      availableCoupon,
    };
    if (checked === true) {
      paymentDispatch({ type: "ADD_TO_PAYMENT", item });
    }
    if (checked === false) {
      paymentDispatch({ type: "DELETE_FROM_PAYMENT", id });
    }
  }, [checked]);

  /* 삭제하기를 누르면 장바구니에서 상품을 제거합니다 */
  const removeFromCart = () => {
    cartDispatch({ type: "REMOVE_FROM_CART", id });
    paymentDispatch({ type: "DELETE_FROM_PAYMENT", id });
    alert("카트에서 제거하였습니다");
  };

  return (
    <div
      className="cart-item"
      style={checked ? { border: "2px solid blue" } : {}}
    >
      <img src={coverImage} alt="no-img" />
      <div className="cart-item-body">
        <p className="cart-item-title">{title}</p>
        <h5 className="cart-item-price">{
          `₩ ${pointer(quantity * price)}` /* 세 자리수 마다 콤마 찍기 */
        }</h5>
      </div>
      <div className="cart-btns">
        <a className="delete" onClick={removeFromCart}>
          삭제하기
        </a>
        <div
          className="coupon"
          style={availableCoupon !== false ? { opacity: 1 } : {}}
        >
          쿠폰 적용 가능
        </div>
        <div className="quantity">
          {/* 수량 마이너스 버튼 */}
          <button
            id="minus"
            className="quantity-btn"
            onClick={() => {
              if (checked === true) {
                alert("수량을 변경하려면 등록을 해제해주세요");
              } else if (quantity > 1) {
                setQuantity(quantity - 1);
              }
            }}
          >
            <FiMinus />
          </button>
          <span>수량: {quantity}</span>
          {/* 수량 플러스 버튼 */}
          <button
            id="plus"
            className="quantity-btn"
            onClick={() => {
              if (checked === true) {
                alert("수량을 변경하려면 등록을 해제해주세요");
              } else if (quantity >= 10) {
                alert("10개 까지만 구매하실 수 있습니다");
              } else {
                setQuantity(quantity + 1);
              }
            }}
          >
            <FiPlus />
          </button>
        </div>
      </div>
      <input
        type="checkbox"
        className="checkbox"
        defaultChecked={checked}
        onChange={() => setChecked(!checked)}
      />
    </div>
  );
}

export default CartItems;
