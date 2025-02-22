import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // Default admin credentials
  const defaultAdminEmail = "intora@intora.in";
  const defaultAdminPassword = "Intora@1500";

  const handleLogin = (e) => {
    e.preventDefault();

    // Get all users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the user exists, first checking for the default admin credentials
    const user = users.find(
      (user) => user.email === email && user.password === password
    ) || (email === defaultAdminEmail && password === defaultAdminPassword ? { email: defaultAdminEmail, password: defaultAdminPassword, role: "admin" } : null);

    if (user) {
      // Set user role in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to the appropriate dashboard
      const from = location.state?.from?.pathname || 
        (user.role === "admin" ? "/adminlayout/dashboard" : "/userlayout/dashboard");
      navigate(from);
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.loginButton}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  inputContainer: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    fontSize: "16px",
    marginBottom: "5px",
    color: "#fff",
    fontWeight: "bold",
    textAlign: "left",  // Ensures the label is left-aligned (although it's the default)
  },
  input: {
    width: "100%",
    padding: "10px",
    color: "#fff",
    backgroundColor: "transparent",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#e24b0f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};


export default Login;
