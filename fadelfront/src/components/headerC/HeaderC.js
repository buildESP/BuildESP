import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

const HeaderC = () => {

    const navigate = useNavigate();

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo">
                    <img src="./media/pics/logo.png" alt="Logo" />
                </div>

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

                <div className="nav-buttons">
                    <button className="add-button">Ajouter une annonce</button>
                    <Link to='/onDemand' className="nav-button">Demandes</Link>
                    <Link to='/profil' className="nav-button">Profil</Link>

                </div>
            </div>
        </header>
    );
};

export default HeaderC;
