import Backdrop from "../Backdrop";
import SubTotal from "../SubTotal";
import { CartDrawerStyles } from "./CartDrawerStyles";
import DrawerHeader from "./DrawerHeader";
import { useApp } from "../../states/AppContext";
import { CartItemType } from "../../types";
import CartItem from "../cards/CartItem";

const CartDrawer = () => {
  //  const dispatch = useAppDispatch();
  const { setOpenCartDrawer, cart } = useApp();
  
  return (
    <CartDrawerStyles>
      <div className="drawer">
        <DrawerHeader
          text="Cart"
          // closeSomething={() => dispatch(openCartDrawer(false))}
          closeSomething={() => setOpenCartDrawer(false)}
        />
        <div className="cart_items_container">
            {cart.map((item: CartItemType) => (
              <CartItem key={item._id} cartItem={item} />
            ))}
        </div>
        <SubTotal />
      </div>
      <Backdrop closeSomething={() => setOpenCartDrawer(false)} />
    </CartDrawerStyles>
  );
};

export default CartDrawer;
