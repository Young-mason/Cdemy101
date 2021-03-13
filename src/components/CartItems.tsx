import { CartItemsProps } from "../modules/interface";
import pointer from "../modules/pointer";
import "../style/CartItems.css";

function CartItems({
  coverImage,
  title,
  price,
  availableCoupon,
}: CartItemsProps) {
  return (
    <div className="cart-item">
      <img src={coverImage} alt="no-img" />
      <div className="cart-item-body">
        <p className="cart-item-title">{title}</p>
        <h5 className="cart-item-price">{
          /* 세 자리수 마다 콤마 찍기 */ `₩ ${pointer(price)}`
        }</h5>
      </div>
      <div className="cart-btns">
        <a className="delete">삭제하기</a>
        <div className="coupon">10% 할인</div>
      </div>
    </div>
  );
}

export default CartItems;
