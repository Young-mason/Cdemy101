import { useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { ModalProps } from "../modules/interface";
import { useCartDispatch, useCartState } from "../modules/CartContext";
import { useHistory } from "react-router-dom";
import "../style/Modal.css";

function Modal({ item, addable, setModal }: ModalProps) {
  const modalContainer = useRef<HTMLDivElement | null>(null);
  const cartItems = useCartState();
  const dispatch = useCartDispatch();
  const history = useHistory();

  /* 
   담기 버튼을 누르면 상품을 장바구니에 담습니다 
   장바구니에 3개가 담겨있다면, 알림을 띄우고 장바구니 페이지로 이동시킵니다 
  */
  const addToCart = () => {
    if (cartItems.length < 3) {
      dispatch({ type: "ADD_TO_CART", item });
      alert("상품을 장바구니에 담았습니다");
      setModal(false);
    } else {
      alert("최대 3개 까지 담을 수 있습니다.");
      setModal(false);
      history.push("/cart");
    }
  };

  /* 빼기 버튼을 누르면 상품을 장바구니에서 삭제합니다 */
  const removeFromCart = () => {
    dispatch({ type: "REMOVE_FROM_CART", id: item.id });
    alert("상품을 장바구니에서 삭제하였습니다");
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
              ? `상품을 담으시겠어요?`
              : `상품이 장바구니에 있습니다. 빼시겠어요?`}
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
