import { useCartState } from "../modules/CartContext";
import Bill from "../components/Bill";
import CartItems from "../components/CartItems";

function Cart() {
  const cartItems = useCartState();

  return (
    <>
      <div className="cart-header">
        <h1>{cartItems.length} Courses in Shopping Cart</h1>
      </div>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => {
            const { id, coverImage, title, price, availableCoupon } = item;
            return (
              <CartItems
                key={id}
                coverImage={coverImage}
                title={title}
                price={price}
                availableCoupon={availableCoupon}
              />
            );
          })}
        </div>
        <Bill />
      </div>
    </>
  );
}

export default Cart;
