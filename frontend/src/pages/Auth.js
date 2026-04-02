import React, { useState } from "react";
import "../styles/auth.css";

function Login({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const initialFormState = {
    fullName: "",
    username: "",
    email: "",
    password: "",
    addictionType: "",
  };

  const [form, setForm] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm(initialFormState);
    setErrors({});
  };

  const handleSubmit = async () => {
    setErrors({});

    try {
      // ================= LOGIN =================
      if (isLogin) {
        // Frontend validation
        if (!form.username.trim() || !form.password.trim()) {
          setErrors({ general: "Username and password are required." });
          return;
        }

        const res = await fetch("http://localhost:5001/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: form.username,
            password: form.password,
          }),
        });

        let data = {};
        try {
          data = await res.json();
        } catch {
          data = {};
        }

        if (res.ok) {
          onLogin({
            username: form.username,
          });
          resetForm();
        } else {
          setErrors({
            general: data.error || "Invalid username or password.",
          });
        }
      }

      // ================= REGISTER =================
      else {
        // Frontend validation
        if (
          !form.fullName.trim() ||
          !form.username.trim() ||
          !form.email.trim() ||
          !form.password.trim() ||
          !form.addictionType.trim()
        ) {
          setErrors({ general: "All fields are required." });
          return;
        }

        const res = await fetch("http://localhost:5001/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
          alert("Registration successful!");
          setIsLogin(true);
          resetForm();
        } else {
          setErrors({
            general: data.error || "Registration failed.",
          });
        }
      }
    } catch (err) {
      setErrors({ general: "Server error. Try again." });
    }
  };

  return (
    <div className="auth-container">
      <div className={`auth-card ${isLogin ? "" : "flip"}`}>
        <div className="card-inner">
          {/* LOGIN SIDE */}
          <div className="card-front">
            <h2>Welcome Back</h2>
            {errors.general && <p className="error">{errors.general}</p>}

            <div className="input-group">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <button onClick={handleSubmit}>Login</button>

            <p>
              Don't have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(false);
                  resetForm();
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Register
              </span>
            </p>
          </div>

          {/* REGISTER SIDE */}
          <div className="card-back">
            <h2>Create Account</h2>
            {errors.general && <p className="error">{errors.general}</p>}

            <div className="input-group">
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <label>Full Name</label>
            </div>

            <div className="input-group">
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
            </div>

            <div className="input-group">
              <input
                name="addictionType"
                value={form.addictionType}
                onChange={handleChange}
                required
              />
              <label>Addiction Type</label>
            </div>

            <button onClick={handleSubmit}>Register</button>

            <p>
              Already have an account?{" "}
              <span
                onClick={() => {
                  setIsLogin(true);
                  resetForm();
                }}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
