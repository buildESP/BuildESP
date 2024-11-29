import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
import './header.css';

const HeaderC = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [activeCategory, setActiveCategory] = useState(null);
    const navigate = useNavigate(); // Utilisation de useNavigate pour changer de page

    // Gestion de la taille de l'écran
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Données des catégories et sous-catégories
    const categories = [
        {
            name: 'Immobilier',
            subcategories: ['Locations', 'Ventes', 'Colocations', 'Bureaux & Commerces'],
        },
        {
            name: 'Véhicules',
            subcategories: ['Voitures', 'Motos', 'Utilitaires', 'Caravaning'],
        },
        {
            name: 'Emploi',
            subcategories: ['Offres d’emploi', 'Stages', 'Services à domicile'],
        },
        {
            name: 'Mode',
            subcategories: ['Vêtements', 'Chaussures', 'Accessoires', 'Montres & Bijoux'],
        },
        {
            name: 'Maison',
            subcategories: ['Meubles', 'Électroménager', 'Décoration', 'Jardinage'],
        },
        {
            name: 'Loisirs',
            subcategories: ['Livres', 'Instruments de musique', 'Jeux & Jouets', 'Sports & Hobbies'],
        },
        {
            name: 'Services',
            subcategories: ['Cours particuliers', 'Déménagement', 'Réparation', 'Transport'],
        },
    ];

    // Fonction pour gérer le clic sur une sous-catégorie
    const handleSubcategoryClick = (subcategory) => {
        navigate('/home', { state: { selectedSubcategory: subcategory } });
    };

    return (
        <>
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
                        <Link to="/addAnAnnounce" className="add-button">
                            Ajouter une annonce
                        </Link>
                        <Link to="/onDemand" className="nav-button">
                            Demandes
                        </Link>
                        <Link to="/profile" className="nav-button">
                            Profil
                        </Link>
                    </div>
                </div>
            </header>
            <nav className="categories-bar">
                <ul className="categories-list">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            className="category-item"
                            onMouseEnter={() => setActiveCategory(category.name)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <span>{category.name}</span>
                            {activeCategory === category.name && (
                                <ul className="subcategories-list">
                                    {category.subcategories.map((sub, subIndex) => (
                                        <li
                                            key={subIndex}
                                            className="subcategory-item"
                                            onClick={() => handleSubcategoryClick(sub)}
                                        >
                                            {sub}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    );
};

export default HeaderC;
