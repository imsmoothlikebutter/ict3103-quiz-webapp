import React, { useState, FormEvent } from "react";
import "./SearchComponent.css";
import { useNavigate } from "react-router-dom";

const PasswordComponent: React.FC = () => {
  const [passwordInput, setPasswordInput] = useState<string>("");

  const navigate = useNavigate();

  const fetchPasswordList = async () => {
    try {
      const response = await fetch("./10-million-password-list-top-1000.txt");
      const text = await response.text();
      return text.split("\n"); // Assuming each password is on a new line
    } catch (error) {
      console.error("Failed to fetch password list", error);
      return [];
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const passwords = await fetchPasswordList();
    const isPasswordInvalid = passwords.includes(passwordInput);

    if (!isPasswordInvalid) {
      console.log("Password is valid");
      navigate("/welcome", { state: { passwordInput: passwordInput } });
    } else {
      console.log("password invalid");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          id="passwordInput"
          type="password"
          value={passwordInput}
          onChange={(e) => setPasswordInput(e.target.value)}
          placeholder="Enter password here"
          className="password-input" // Add the input style
        />
        <button type="submit" className="login-button" id="login-button">
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default PasswordComponent;
