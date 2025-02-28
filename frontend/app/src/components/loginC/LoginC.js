import React, { useState, useEffect } from "react";
import axios from "axios";
import FooterwavesC from "../footerWavesC/FooterwavesC";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState(""); // Fixed typo
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Clear messages after 5 seconds
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);

    // Basic form validation
    if (!email || !password) {
      setErrorMessage("Veuillez remplir tous les champs requis");
      setIsLoading(false);
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      setIsLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const response = await axios.post(
          "http://localhost:3000/api/access-token",
          {
            login: email,
            password: password,
          }
        );

        if (response.status === 200) {
          const { token, userId } = response.data;
          // Store token securely
          if (rememberMe) {
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
          } else {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userId", userId);
          }
          
          setSuccessMessage("Connexion réussie !");
          navigate('/home');
          window.location.reload();
        }
      } else {
        // Signup
        const response = await axios.post(
          "http://localhost:3000/api/users",
          {
            firstname: name,
            lastname: lastName,
            email: email,
            password: password,
            is_admin: false,
          }
        );

        if (response.status === 201) {
          setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter");
          toggleForm();
        }
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message;
      setErrorMessage(
        isLogin
          ? `Échec de la connexion: ${errorMsg}`
          : `Échec de l'inscription: ${errorMsg}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setLastName("");
    setErrorMessage("");
    setSuccessMessage("");
    setRememberMe(false);
  };

  return (
    <div className="login-container">
      <div className="background-shape shape1"></div>
      <div className="background-shape shape2"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="title-toggle">
          <button
            type="button"
            className={`toggle-button ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
            disabled={isLoading}
          >
            Connexion
          </button>
          <span className="divider-vertical">|</span>
          <button
            type="button"
            className={`toggle-button ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
            disabled={isLoading}
          >
            S'enregistrer
          </button>
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="name">Nom</label>
              <input
                type="text"
                id="name"
                placeholder="Nom complet"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Prénom</label>
              <input
                type="text"
                id="lastname"
                placeholder="Prénom"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
          </>
        )}

        <div className="input-group">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <h4 id="conditions">
              En vous inscrivant, vous acceptez nos conditions d'utilisation et
              notre politique de confidentialité.
            </h4>
          </>
        )}

        {isLogin && (
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe">Se rappeler de moi</label>
          </div>
        )}

        <button 
          type="submit" 
          className="login-button"
          disabled={isLoading}
        >
          {isLoading 
            ? "Chargement..." 
            : isLogin 
              ? "Se connecter" 
              : "S'enregistrer"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {isLogin && <div className="divider"><span>OU</span></div>}
        {isLogin && (
          <div className="social-buttons">
            <img src="media/pics/facebook.webp" id="facebook" alt="Facebook" />
            <img src="media/pics/google.png" id="google" alt="Google" />
            <img src="media/pics/linkedln.webp" id="linkedln" alt="LinkedIn" />
          </div>
        )}
      </form>
      <FooterwavesC />
    </div>
  );
};

export default LoginC;