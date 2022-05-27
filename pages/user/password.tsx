import UserNav from "../../components/nav/UserNav";
import { DashboardStyles } from "../../components/styles/DashboardStyles";
import Header from "../../components/Header";
import { useState } from "react";
import { useApp } from "../../states/AppContext";

const Wishlist = () => {
  const [password, setPassword] = useState("");
  const { loading, forgotPassword } = useApp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    forgotPassword(password);
  };

  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          placeholder="Enter new password"
          disabled={loading}
          value={password}
        />
        <button
          className="btn btn-primary"
          disabled={!password || password.length < 6 || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  
  return (
      <>
      <Header />
    <DashboardStyles>
      <div className="content_wrapper">
        <div className="left">
            <UserNav />
        </div>
        <div className="right">
            {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Password Update</h4>
          )}
          {passwordUpdateForm()}
        </div>    
      </div>
    </DashboardStyles>
      </>
  );
}

export default Wishlist