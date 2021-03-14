import { useState, useEffect } from "react";
import { CardProps } from "../modules/interface";
import { useCartState } from "../modules/CartContext";
import Modal from "./Modal";

function Card({ item, title, coverImage, price }: CardProps) {
  const [modal, setModal] = useState(false);
  const [addable, setAddable] = useState(false);
  const cartItems = useCartState();

  /* 아이템이 Cart에 없는 경우, 모달에서 추가 버튼이 활성화되도록 합니다*/
  useEffect(() => {
    const isInclude = cartItems.find((el) => el.id === item.id);
    if (!isInclude) {
      setAddable(true);
    }
  }, [cartItems, item.id]);

  return (
    <div className="card">
      <img className="card-img" src={coverImage} alt="no-img" />
      <h4 className="card-title">{title}</h4>
      <h3 className="card-price">{price}</h3>
      <button className="cart-handler" onClick={() => setModal(!modal)}>
        🛒
      </button>
      {modal ? <Modal item={item} addable={addable} setModal={setModal} /> : ""}
    </div>
  );
}

export default Card;
