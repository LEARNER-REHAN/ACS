import "../styles/auth.css";

function Register() {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Register</h2>

        <input type="text" placeholder="Full Name" />
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />

        <button className="auth-btn">Create Account</button>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
