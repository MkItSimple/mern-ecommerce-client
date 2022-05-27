import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { useApp } from '../states/AppContext';
import styled from 'styled-components';

const RegisterCompleteStyles = styled.div`
  max-width: 430px;
  padding: 4em 2em;
  margin: 0 auto;
  font-family: "Archivo";
  font-size: 14px;
  h1 {
    text-align: center;
  }
  input {
    margin-bottom: 1em;
  }
`
const RegisterComplete = () => {
  const {signinWithLink} = useApp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const emailForRegistration = window.localStorage.getItem("emailForRegistration");
    emailForRegistration ? setEmail(emailForRegistration) : ""
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      await signinWithLink(email, password)
      // console.log("signinWithLink");  
    } catch (err) {
      console.log(err)
      
    }
  }

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
       <input type="email" className="regular full" value={email} disabled />

      <input
        type="password"
        className="regular full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn_black big full">
        Submit
      </button>
    </form>
  );

  return (
    <RegisterCompleteStyles>
      <h1>Complete Registration</h1>
      {completeRegistrationForm()}
    </RegisterCompleteStyles>
  )
}

export default RegisterComplete