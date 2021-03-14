import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { ModalProps } from "../modules/interface";
import { useCartDispatch } from "../modules/CartContext";
import "../style/Modal.css";

function Modal({ item, addable, setModal }: ModalProps) {
  const modalContainer = useRef<HTMLDivElement>(null);
  const dispatch = useCartDispatch();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", item });
    alert("카트에 담았습니다");
    setModal(false);
  };

  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", id: item.id });
    alert("카트에서 삭제하였습니다");
    setModal(false);
  };

  return (
    <div
      className="modal-container"
      ref={modalContainer}
      onClick={(e) => {
        if (e.target === modalContainer.current) {
          setModal(false);
        }
      }}
    >
      <div className="modal">
        <div className="modal-header">
          <h2>🛒 장바구니</h2>
          <p>
            {addable
              ? `장바구니에 공간이 남아있습니다.
            담으시겠어요?`
              : `이미 장바구니에 있습니다. 빼시겠어요?`}
          </p>
        </div>
        <div className="modal-btns">
          {addable ? (
            <button className="modal-btn" onClick={addToCart}>
              담기
            </button>
          ) : (
            <button className="modal-btn" onClick={removeFromCart}>
              빼기
            </button>
          )}
        </div>
        <button id="exit-btn" onClick={() => setModal(false)}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default Modal;
