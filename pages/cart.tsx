import styled from 'styled-components';
import CartItems from '../components/CartItems';
import SubTotal from '../components/SubTotal';
import Header from "../components/Header";
 const CartStyles = styled.div`
 width: 100vw;
 max-width: 1200px;
 margin: 0 auto;
 display: flex;
 flex-direction: row;
 padding-top: 2em;
 .cart_left {
     flex: 1;
     padding: 1em;
 }
 .cart_right {
     position: relative;
     width: 500px;
 }
 .subtotal {
    top: 0px;
    border-top: none;
 }
 `
const Cart = () => {
  return (
    <>
    <Header/>
    <CartStyles>
        <div className='cart_left'>
            <CartItems />    
        </div><div className='cart_right'>
            <SubTotal />
        </div>
    </CartStyles>
    </>
  )
}

export default Cart