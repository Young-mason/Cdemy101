import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { ModalProps } from "../modules/interface";
import "../style/Modal.css";

function Modal({ setModal }: ModalProps) {
  const modalContainer = useRef<HTMLDivElement>(null);

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
            장바구니에 공간이 남아있습니다. <br />
            담으시겠어요?
          </p>
        </div>
        <div className="modal-btns">
          <button className="modal-btn">담기</button>
        </div>
        <button id="exit-btn" onClick={() => setModal(false)}>
          <FaTimes />
        </button>
      </div>
    </div>
  );
}

export default Modal;
