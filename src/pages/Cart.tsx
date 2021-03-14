import { useState } from "react";
import { useCartState } from "../modules/CartContext";
import { PaymentContextProvider } from "../modules/PaymentContext";
import Bill from "../components/Bill";
import CartItems from "../components/CartItems";

function Cart() {
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const cartItems = useCartState();

  return (
    <>
      <PaymentContextProvider>
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
                  id={id}
                  coverImage={coverImage}
                  title={title}
                  price={price}
                  availableCoupon={availableCoupon}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                />
              );
            })}
          </div>
          <Bill
            coupon={coupon}
            setCoupon={setCoupon}
            couponApplied={couponApplied}
            setCouponApplied={setCouponApplied}
            totalPrice={totalPrice}
          />
        </div>
      </PaymentContextProvider>
    </>
  );
}

export default Cart;
