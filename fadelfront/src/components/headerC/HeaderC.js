import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const HeaderC = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // Détecte si on est sur un écran de bureau

    // Vérifier la taille de l'écran au redimensionnement
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                   <Link to="/home" id="homeHeader">  <img src="./media/pics/logo.png" alt="Logo" /></Link>
                </div>
                {isDesktop && (
                    <div className="search-bar">
                    <input type="text" placeholder="Rechercher..." />
                    <button className="search-button">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                        >
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.442 1.398a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
                        </svg>
                    </button>
                </div>
                )}
                

                <div className="nav-buttons">
                    {!isDesktop && (
                        <Link to="/home" className="offres-button">Offres</Link>
                    )}
                    <Link to='/addAnAnnounce' className="add-button">Ajouter une annonce</Link>
                    <Link to='/onDemand' className="nav-button">Demandes</Link>
                    <Link to='/profile' className="nav-button">Profil</Link>
                </div>
            </div>
        </header>
    );
};

export default HeaderC;
