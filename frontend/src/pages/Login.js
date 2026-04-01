import "../styles/auth.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login</h2>

        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="auth-btn">Login</button>

        <p>
          Don’t have an account?{" "}
          <Link to="/register" className="">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
