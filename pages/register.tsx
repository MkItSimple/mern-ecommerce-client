import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useApp } from '../states/AppContext'

import styled from 'styled-components';import Header from '../components/Header';
 const RegisterStyles = styled.div`
  max-width: 430px;
  padding: 4em 2em;
  margin: 0 auto;
  font-family: "Archivo";
  font-size: 14px;
  h1 {
    text-align: center;
  }
`

const Register = () => {
  const router = useRouter();
  const { user, signup } = useApp()
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user && user.token) router.push("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signup(email)
    } catch (err) {
      console.log(err)
    }
  }

  const registerForm = () => (
    <>
      <Header />
      <RegisterStyles>
        <form onSubmit={handleSubmit}>
        <h1>CREATE ACCOUNT</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="regular full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          autoFocus
        />

        <br />
        <button type="submit" className="btn big full btn_black">
          Create
        </button>
      </form>
      </RegisterStyles>
    </> 
  );

  return (
    registerForm()
  )
}

export default Register