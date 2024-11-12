// src/components/Auth/LoginForm.tsx
import React, { useState } from "react";
import { authService } from "./AuthService";
import styles from "./Auth.module.css";

//@TODO: error handling with status code
//@TODO: clear fields after submitting form
//@TODO: form validation
//@TODO: once logged, goto Dashboard/Home

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (authService.login(username, password)) {
      alert("Login successful!");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Login</h2>
      <div className={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};
