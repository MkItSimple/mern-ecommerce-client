import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Loading from "../components/Loading";
import { LoginStyles } from "../components/styles/LoginStyles";
import { useApp } from "../states/AppContext";

const Login = () => {
  const router = useRouter();
  const { user, login, loginWithGoogle, intended, loading } = useApp();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login(email, password);
  };

  useEffect(() => {
    // // check if intended router is not empty ""
    const ID = setTimeout(() => {

      if (intended) {
        return
      } else {
        if (user) {
          if (user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/user/history");
          }
        }
      }
    }, 700);

    return () => {
      clearTimeout(ID)
    }
    
  }, [user, router, intended]);

  return (
    <>
    {loading && <Loading />}
    <Header />
    <LoginStyles>
      <h1 className="section-header__title">Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email</label>
        <input
          type="text"
          name="email"
          id="email"
          className="regular full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoCorrect="off"
          autoCapitalize="off"
          // autofocus=""
        />
        <div className="label_container">
          <label htmlFor="password">password</label>
          <Link href="/forgot-password" className="forgot_password">
            Forgot password?
          </Link>
        </div>
        <input
          type="text"
          name="password"
          id="password"
          className="regular full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoCorrect="off"
          autoCapitalize="off"
          // autoFocus
        />
        <button
          type="submit"
          className="big full btn_black"
          disabled={!email || password.length < 4}
        >
          Login with Email / Password
        </button>
        <div className="or">OR</div>
        <div className="btn full login_with_google" onClick={loginWithGoogle}>
          <div className="google_icon">
            <Image src="/images/google-color.svg" alt="" layout="fill" objectFit="cover" />
          </div>
          
          <span>Login with Google</span>
        </div>

        <div className="create_account_link">
          <Link href="/register">Create Account</Link>
        </div>
        
      </form>
    </LoginStyles>
    </>
  );
};

export default Login;
