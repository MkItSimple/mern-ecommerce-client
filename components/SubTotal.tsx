import { userCart } from "../api/userApi";
import { SubTotalStyles } from "./SubTotalStyles";
import { useApp } from "../states/AppContext";
import { useRouter } from "next/router";
import { CartItemType } from "../types";
import { numberWithCommas } from "../hooks/useFunctions";

const SubTotal = () => {
  const router = useRouter();
  const { user, cart, setOpenCartDrawer, setIntended } = useApp(); 

  const saveOrderToDb = () => {
    user && userCart(cart, user.token)
      .then((res: any) => {
        setOpenCartDrawer(false)
        if (res.data.ok) router.replace("/checkout");
      })
      .catch((err: any) => console.log("cart save err", err));
  };

  const saveCashOrderToDb = () => {
    user && userCart(cart, user.token)
      .then((res: any) => {
        console.log("CART POST RES", res);
        if (res.data.ok) router.replace("/checkout");
      })
      .catch((err: any) => console.log("cart save err", err));
  }; 
  const totalPrice = cart.reduce(
      (total: number, current: CartItemType) => (total += current.sale === "Yes" ? current.discount_price * current.quantity : current.price * current.quantity),
      0
    )
  
  const loginToCheckout = () => {
    setIntended('/checkout')
    setOpenCartDrawer(false)
    router.push("/login")
  };
  return (
    <SubTotalStyles>
      <div className="subtotal">
        <div className="subtotal_container">
          <div className="subtotal_label">Subtotal</div>
          <div className="subtotal_value">₱{numberWithCommas(totalPrice)}</div>
        </div>
        <div className="shipping_description">
          Shipping, taxes, and discount codes calculated at checkout.
        </div>

        {user ? (
          <div>
            <button
              onClick={saveOrderToDb}
              className="btn_black big uc"
              disabled={!cart.length}
            >
              Proceed to Checkout
            </button>
            <button
              onClick={saveCashOrderToDb}
              className="btn_black big uc"
              disabled={!cart.length}
            >
              Pay Cash on Delivery
            </button>
          </div>
        ) : (
          <button className="btn_black big uc" onClick={loginToCheckout}>
            Login to Checkout
          </button>
        )}
      </div>
    </SubTotalStyles>
  );
};

export default SubTotal;