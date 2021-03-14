import { useState } from "react";
import { CardProps } from "../modules/interface";
import Modal from "./Modal";

function Card({ title, coverImage, price }: CardProps) {
  const [modal, setModal] = useState(false);

  return (
    <div className="card">
      <img className="card-img" src={coverImage} alt="no-img" />
      <h4 className="card-title">{title}</h4>
      <h3 className="card-price">{price}</h3>
      <button className="cart-handler" onClick={() => setModal(!modal)}>
        🛒
      </button>
      {modal ? <Modal setModal={setModal} /> : ""}
    </div>
  );
}

export default Card;
