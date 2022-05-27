import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import styled from "styled-components";
import StripeCheckout from "../components/StripeCheckout";
const PaymentStyles = styled.div``;

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.stripeKey as string);

const Payment = () => {
  return (
    <PaymentStyles>
      <Elements stripe={promise}>
        <StripeCheckout />
      </Elements>
    </PaymentStyles>
  );
};

export default Payment;
