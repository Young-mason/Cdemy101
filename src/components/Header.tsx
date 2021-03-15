import "../style/Header.css";
import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useCartState } from "../modules/CartContext";

function Header() {
  const cartItems = useCartState();

  return (
    <header className="header">
      <Link to="/" className="logo">
        Cdemy101
      </Link>
      <input
        type="text"
        placeholder="검색어를 입력해주세요"
        className="search-input"
      />
      <div className="right">
        <h4>My Learning</h4>
        <Link to="/cart" className="cart">
          <IoCartOutline />
          <div id="badge">
            <span>{cartItems.length}</span>
          </div>
        </Link>
        <div className="profile">
          <img
            src="https://avatars.githubusercontent.com/u/61150435?s=460&u=947ad32fcd6e6b5682027a131f390e6b781cf7cd&v=4"
            alt="no-img"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
