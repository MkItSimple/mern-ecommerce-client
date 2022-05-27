import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import { useApp } from "../states/AppContext";
const RootDiv = styled.div`
  max-width: 400px;
  padding: 4em 2em;
  margin: 0 auto;
  font-family: "Archivo";
  /* background-color: rgba(0, 0, 0, 0.1); */
  form {
    width: 100%;
    /* background-color: rgba(0, 0, 0, 0.1); */
  }

  h1 {
    margin-bottom: 1em;
    text-align: center;
  }
  .label_container {
    display: block;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
  }
  .forgot_password {
    width: 100%;
    text-align: right;
    font-size: 0.85em;
  }
  label {
    text-transform: uppercase;
    letter-spacing: .1em;
  }
  input, .btn {
    margin-bottom: 1em;
    
  }
  .cancel {
    border: none;
  }
`;
const ForgotPassword = () => {
    const router = useRouter();
   const [email, setEmail] = useState("")
   const { loading, forgotPassword} = useApp();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(email);
}
  return (
    <RootDiv>
      <h1>reset your password</h1>
      <form onSubmit={handleSubmit}>
        <p>We will send you an email to reset your password.</p>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="regular full"
          autoCorrect="off"
          autoCapitalize="off"
        />

        <button className="big full btn_black">
          Submit
        </button>
        <button className="big full btn_white cancel" onClick={() => router.push("/login")}>
          Cancel
        </button>
      </form>
    </RootDiv>
  );
};

export default ForgotPassword;
