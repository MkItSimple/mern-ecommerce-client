import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useApp } from '../states/AppContext'

import styled from 'styled-components';import Header from '../components/Header';
import Loading from '../components/Loading';
 const RegisterStyles = styled.div`
  max-width: 430px;
  padding: 4em 2em;
  margin: 0 auto;
  font-family: "Archivo";
  font-size: 14px;
  h1 {
    text-align: center;
  }
  .register_success_message {
    background-color: #9ff9e1;
    color: #054861;
    font-family: 'Gotham Book';
    font-size: 1.3em;
    padding: .5em;
  }
`

const Register = () => {
  const router = useRouter();
  const { user, signup, loading } = useApp()
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (user && user.token) router.push("/");
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signup(email)
      setSent(true);
    } catch (err) {
      console.log(err)
    }
  }

  const registerForm = () => (
    <>
      {loading && <Loading />}
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
        {sent && <p className='register_success_message'>{`Email is sent to ${email}. Check your inbox OR check it in your spam if its not in your inbox.`}</p>}
      </form>
      </RegisterStyles>
    </> 
  );

  return (
    registerForm()
  )
}

export default Register
// #054861