import React from "react";
import { Link} from "react-router-dom";
import './pages.css'
import TopBar from "../components/TopBar";
import axios from "axios";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await axios.post("/auth/login", {
        email,
        password,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="top-bar">
        <TopBar/>
    <div className="form-container">
      <div className="form-wrapper">
        <h2 className="title">LOGIN</h2>
        <form className="login-form" onSubmit={login}>
          <label htmlFor="email">
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            required
          />
          </label>
          <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="******"
            required
          />
          </label>
          <button className="login-button" type="submit">LOG IN</button>
        </form>

        <p className="signup-login">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;