import React, { useState } from 'react';
import FooterwavesC from '../footerWavesC/FooterwavesC';
import './login.css';

const LoginC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLogin) {
            console.log('Connexion réussie');
        } else {
            if (password === confirmPassword) {
                console.log('Inscription réussie');
            } else {
                console.error('Les mots de passe ne correspondent pas');
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setName('');
        setBirthdate('');
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
                        className={`toggle-button ${isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(true)}
                    >
                        Connexion
                    </button>
                    <span className="divider-vertical">|</span>
                    <button
                        type="button"
                        className={`toggle-button ${!isLogin ? 'active' : ''}`}
                        onClick={() => setIsLogin(false)}
                    >
                        S'enregistrer
                    </button>
                </div>

                {!isLogin && (
                        <div className="input-group">
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                className='inputName'
                                id="name"
                                placeholder="Nom complet"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                            />
                        </div>
                        <h4 id="conditions">
                            En vous inscrivant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
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
                        />
                        <label htmlFor="rememberMe">Se rappeler de mon mot de passe</label>
                    </div>
                )}

                <button type="submit" className="login-button">
                    {isLogin ? 'Se connecter' : 'S\'enregistrer'}
                </button>

                {isLogin && <div className="divider"><span>OU</span></div>}

                {isLogin && (
                    <div className="social-buttons">
                        <img src="./media/pics/facebook.webp" id="facebook" alt="Facebook" />
                        <img src="./media/pics/google.png" id="google" alt="Google" />
                        <img src="./media/pics/linkedln.webp" id="linkedln" alt="LinkedIn" />
                    </div>
                )}
            </form>
            <FooterwavesC />
        </div>
    );
};

export default LoginC;
