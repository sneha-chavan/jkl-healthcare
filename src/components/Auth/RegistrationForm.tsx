// src/components/Auth/RegistrationForm.tsx
import React, { useState } from "react";
import { authService } from "./AuthService";
import styles from "./Auth.module.css";

//@TODO: error handling with status code
//@TODO: clear fields after submitting form
//@TODO: form validation
//@TODO: once registered, should auto login and goto Dashboard/Home

export const RegistrationForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (authService.register(username, password)) {
      alert("Registration successful!");
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>Register</h2>
      <div className={styles.authForm}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className={styles.errorMessage}>{error}</p>}
        <button onClick={handleRegister}>Create Account</button>
      </div>
    </div>
  );
};
