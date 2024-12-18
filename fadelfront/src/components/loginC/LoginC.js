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
  const [rememberMe, setRememberMe] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle entre Connexion et Inscription
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fonction de soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Réinitialiser le message d'erreur à chaque soumission
    setSuccessMessage(""); // Réinitialiser le message de succès

    if (isLogin) {
      // Connexion
      try {
        const response = await axios.post("http://localhost:4000/api/access-token", {
          login: email,
          password: password,
        });

        if (response.status === 200) {
          console.log("Connexion réussie :", response.data);
          localStorage.setItem("Token", response.data.token);
          localStorage.setItem("userId", response.data.userId);

          // Rediriger vers la page d'accueil et recharger la page
          navigate('/home'); // Rediriger après la connexion réussie
          window.location.reload();  // Recharger la page après la redirection
        }
      } catch (error) {
        console.error("Erreur de connexion :", error.response?.data || error.message);
        setErrorMessage("Échec de la connexion. Veuillez vérifier vos identifiants.");
      }
    } else {
      // Inscription
      if (password !== confirmPassword) {
        setErrorMessage("Les mots de passe ne correspondent pas.");
        return;
      }
      try {
        const response = await axios.post("http://localhost:4000/api/users", {
          firstname: name,
          lastname: "Rococo", // Mettre un nom par défaut ou d'après un champ utilisateur
          email: email,
          password: password,
          is_admin: true,
        });

        if (response.status === 201) {
          console.log("Inscription réussie :", response.data);
          setSuccessMessage("Inscription réussie ! Vous pouvez maintenant vous connecter.");
          toggleForm(); // Basculer vers le formulaire de connexion
        }
      } catch (error) {
        console.error("Erreur d'inscription :", error.response?.data || error.message);
        setErrorMessage("Échec de l'inscription. Veuillez réessayer.");
      }
    }
  };

  // Fonction pour basculer entre les modes Connexion et Inscription
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login-container">
      <div className="background-shape shape1"></div>
      <div className="background-shape shape2"></div>

      <form className="login-form" onSubmit={handleSubmit}>
        {/* Titre Connexion / S'enregistrer */}
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

        {/* Formulaire d'inscription */}
        {!isLogin && (
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
        )}

        {/* Formulaire de connexion / email */}
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

        {/* Formulaire de mot de passe */}
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

        {/* Formulaire d'inscription (confirmation mot de passe) */}
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

        {/* Case "Se rappeler de mon mot de passe" (uniquement pour la connexion) */}
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

        {/* Bouton de soumission */}
        <button type="submit" className="login-button">
          {isLogin ? "Se connecter" : "S'enregistrer"}
        </button>

        {/* Messages d'erreur et de succès */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Séparateur et boutons sociaux */}
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
