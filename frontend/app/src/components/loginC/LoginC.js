import React, { useState } from "react";
import axios from "axios";
import FooterwavesC from "../footerWavesC/FooterwavesC";
import "./login.css";
import { useNavigate } from "react-router-dom";

const LoginC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [lasTname, setLasTname] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Signup
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(""); // Reset success message

    if (isLogin) {
      try {
        const response = await axios.post("http://localhost:3000/api/access-token", {
          login: email,
          password: password,
        }, {
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.status === 200) {
          console.log("✅ Connexion réussie :", response.data);

          // Vérifier que le token est bien présent dans la réponse
          if (!response.data.token) {
            setErrorMessage("Aucun token reçu. Veuillez réessayer.");
            return;
          }

          // Stocker le token et l'userId
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);

          // Vérifier que le token est bien dans le localStorage
          console.log("Token stocké :", localStorage.getItem("token"));

          // Redirection vers la page d'accueil
          console.log("🚀 Redirection vers la page d'accueil...");
          navigate('/home');
        }
      } catch (error) {
        console.error("❌ Erreur de connexion :", error.response?.data || error.message);

        if (error.response) {
          const status = error.response.status;
          const message = error.response.data?.message || "Erreur inconnue.";

          if (status === 400) {
            setErrorMessage("⚠️ Login et mot de passe requis.");
          } else if (status === 401) {
            setErrorMessage("⛔ Identifiants incorrects. Veuillez réessayer.");
          } else if (status === 500) {
            setErrorMessage("❌ Erreur serveur. Veuillez réessayer plus tard.");
          } else {
            setErrorMessage(message);
          }
        } else if (error.request) {
          setErrorMessage("🚫 Impossible de contacter le serveur. Vérifiez votre connexion.");
        } else {
          setErrorMessage("❌ Une erreur inattendue est survenue.");
        }
      }
    }
    else {
      // Signup
      if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas.");
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/api/users", {
          firstname: name,
          lastname: lasTname,
          email: email,
          password: password,
          is_admin: false, // Default to false unless specified otherwise
        });

        if (response.status === 201) {
          console.log("Inscription réussie :", response.data);
          setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
          toggleForm(); // Switch to login form
          alert("Inscription validée ✅. Vous pouvez vous connecter");
        }
      } catch (error) {
        console.error("Erreur d'inscription :", error.response?.data || error.message);
        setErrorMessage(
          error.response?.data?.message ||
          "Échec de l'inscription. Veuillez réessayer."
        );
        alert("Échec de l'inscription 🚫. Veuillez réessayer");
      }
    }
  };

  // Toggle between Login and Signup forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setLasTname("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login-container">
      <div className="background-shape shape1"></div>
      <div className="background-shape shape2"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        {/* Toggle between Login and Signup */}
        <div className="title-toggle">
          <button
            type="button"
            className={`toggle-button ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Connexion
          </button>
          <span className="divider-vertical">|</span>
          <button
            type="button"
            className={`toggle-button ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            S'enregistrer
          </button>
        </div>

        {/* Signup fields */}
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
              />
            </div>
            <div className="input-group">
              <label htmlFor="lastname">Prénom</label>
              <input
                type="text"
                id="lastname"
                placeholder="Prénom"
                value={lasTname}
                onChange={(e) => setLasTname(e.target.value)}
                required
              />
            </div>
          </>
        )}

        {/* Email field */}
        <div className="input-group">
          <label htmlFor="email">Adresse email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password field */}
        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* Confirm password field for signup */}
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
              />
            </div>
            <h4 id="conditions">
              En vous inscrivant, vous acceptez nos conditions d'utilisation et
              notre politique de confidentialité.
            </h4>
          </>
        )}

        {/* Remember me checkbox for login */}
        {isLogin && (
          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Se rappeler de mon mot de passe</label>
          </div>
        )}

        {/* Submit button */}
        <button type="submit" className="login-button">
          {isLogin ? "Se connecter" : "S'enregistrer"}
        </button>

        {/* Error and success messages */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Social login options */}
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