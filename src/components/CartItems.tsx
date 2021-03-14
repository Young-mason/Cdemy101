import { useState, useEffect } from "react";
import { CartItemsProps } from "../modules/interface";
import { usePaymentDispatch, usePaymentState } from "../modules/PaymentContext";
import { FiPlus, FiMinus } from "react-icons/fi";
import pointer from "../modules/pointer";
import "../style/CartItems.css";

function CartItems({
  id,
  coverImage,
  title,
  price,
  availableCoupon,
  totalPrice,
  setTotalPrice,
}: CartItemsProps) {
  const [quantity, setQuantity] = useState(1);
  const [checked, setChecked] = useState(false);
  const dispatch = usePaymentDispatch();
  const paymentList = usePaymentState();

  console.log(paymentList);
  /* 체크된 상품의 가격을 최종 가격에 등록합니다*/
  const item = {
    id,
    title,
    price,
    quantity,
    availableCoupon,
  };
  useEffect(() => {
    if (checked === true) {
      dispatch({ type: "ADD_TO_PAYMENT", item });
    }
    if (checked === false) {
      dispatch({ type: "DELETE_FROM_PAYMENT", id });
    }
  }, [checked]);

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
        <a className="delete">삭제하기</a>
        <div
          className="coupon"
          style={availableCoupon !== false ? { opacity: 1 } : {}}
        >
          쿠폰 적용 가능
        </div>
        <div className="quantity">
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
          <button
            id="plus"
            className="quantity-btn"
            onClick={() => {
              if (checked === true) {
                alert("수량을 변경하려면 등록을 해제해주세요");
              } else if (quantity >= 5) {
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
