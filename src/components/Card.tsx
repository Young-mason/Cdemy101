import { useState, useEffect } from "react";
import { CardProps } from "../modules/interface";
import { useCartState } from "../modules/CartContext";
import Modal from "./Modal";

function Card({ item, title, coverImage, price }: CardProps) {
  const [modal, setModal] = useState(false);
  const [addable, setAddable] = useState(false);
  const cartItems = useCartState();

  useEffect(() => {
    const isInclude = cartItems.find((el) => el.id === item.id);
    if (!isInclude && cartItems.length < 3) {
      setAddable(true);
    }
  }, []);

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
