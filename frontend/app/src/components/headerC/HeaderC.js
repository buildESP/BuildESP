// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom'; // Importer useNavigate pour la redirection
// import axios from 'axios';
// import './header.css';

// const HeaderC = () => {
//     const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
//     const [activeCategory, setActiveCategory] = useState(null);
//     const [categories, setCategories] = useState([]);
//     const navigate = useNavigate(); // Utilisation de useNavigate pour changer de page

//     // Gestion de la taille de l'écran
//     useEffect(() => {
//         const handleResize = () => {
//             setIsDesktop(window.innerWidth >= 1024);
//         };

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     // Récupérer les catégories depuis l'API
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/categories');
//                 const formattedCategories = response.data.map((category) => ({
//                     name: category.name,
//                     subcategories: category.subcategories.map((sub) => ({
//                         name: sub.name,
//                         id: sub.id, // Inclure l'ID de la sous-catégorie
//                     })),
//                 }));
//                 setCategories(formattedCategories);
//             } catch (error) {
//                 console.error("Erreur lors de la récupération des catégories :", error);
//             }
//         };

//         fetchCategories();
//     }, []);

//     // Fonction pour gérer le clic sur une sous-catégorie
//     const handleSubcategoryClick = (category, subcategory) => {
//         localStorage.setItem('subcategory_id', subcategory.id); // Stocker l'ID dans le localStorage
//         navigate(`/home/${category.name}/${subcategory.name}`, { state: { selectedSubcategory: subcategory.name } });
//     };

//     // Fonction pour gérer le clic sur le bouton "Tout"
//     const handleAllClick = () => {
//         localStorage.removeItem('subcategory_id'); // Supprimer la sous-catégorie du localStorage
//         navigate('/home'); // Rediriger vers la page d'accueil sans sous-catégorie
//     };

//        // Fonction pour gérer la déconnexion
//        const handleLogout = () => {
//         localStorage.clear(); // Supprime toutes les données du localStorage
//         window.location.reload(); // Rafraîchir la page
//     };

//     return (
//         <>
//             <header className="header">
//                 <div className="header-container">
//                     <div className="logo">
//                     <Link to="/home" id="quartier">
//                         <img src="./media/pics/logo.png" className='homelogo' alt="Logo" onClick={handleAllClick}/>                        
//                     </Link>
                        
//                     </div>
                    
//                     <div className="nav-buttons">
//                         <Link to="/addAnAnnounce" className="add-button">
//                             Ajouter une annonce
//                         </Link>
//                         <Link to="/onDemand" className="nav-button">
//                             Demandes
//                         </Link>
//                         <Link to="/profile" className="nav-button">
//                             Profil
//                         </Link>
//                         <button onClick={handleLogout} className="nav-button">Déconnexion</button>
//                     </div>
//                 </div>
//             </header>
//             <nav className="categories-bar">
//                 <ul className="categories-list">
//                     {categories.map((category, index) => (
//                         <li
//                             key={index}
//                             className="category-item"
//                             onMouseEnter={() => setActiveCategory(category.name)}
//                             onMouseLeave={() => setActiveCategory(null)}
//                         >
//                             <span>{category.name}</span>
//                             {activeCategory === category.name && (
//                                 <ul className="subcategories-list">
//                                     {category.subcategories.map((sub, subIndex) => (
//                                         <li
//                                             key={subIndex}
//                                             className="subcategory-item"
//                                             onClick={() => handleSubcategoryClick(category, sub)}
//                                         >
//                                             {sub.name}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             )}
//                         </li>
//                     ))}
//                 </ul>
//             </nav>
//         </>
//     );
// };

// export default HeaderC;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './header.css';

const HeaderC = () => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const [activeCategory, setActiveCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    // Handle screen size changes
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/categories');
                const formattedCategories = response.data.map((category) => ({
                    name: category.name,
                    subcategories: category.subcategories.map((sub) => ({
                        name: sub.name,
                        id: sub.id,
                    })),
                }));
                setCategories(formattedCategories);
            } catch (error) {
                console.error("Erreur lors de la récupération des catégories :", error);
            }
        };

        fetchCategories();
    }, []);

    // Handle subcategory click and navigate
    const handleSubcategoryClick = (category, subcategory) => {
        console.log("Clicked subcategory:", subcategory); // Debugging
        localStorage.setItem('subcategory_id', subcategory.id); // Store ID in localStorage
        navigate(`/home/${category.name}/${subcategory.name}`, { state: { selectedSubcategory: subcategory.name } });
    };

    // Handle "All" click (reset subcategory selection)
    const handleAllClick = () => {
        localStorage.removeItem('subcategory_id'); // Remove stored subcategory ID
        navigate('/home'); // Redirect to home
    };

    // Handle logout
    const handleLogout = () => {
        localStorage.clear(); // Clear all stored data
        window.location.reload(); // Refresh the page
    };

    return (
        <>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <Link to="/home" id="quartier">
                            <img src="./media/pics/logo.png" className='homelogo' alt="Logo" onClick={handleAllClick} />
                        </Link>
                    </div>

                    <div className="nav-buttons">
                        <Link to="/addAnAnnounce" className="add-button">Ajouter une annonce</Link>
                        <Link to="/onDemand" className="nav-button">Demandes</Link>
                        <Link to="/profile" className="nav-button">Profil</Link>
                        <button onClick={handleLogout} className="nav-button">Déconnexion</button>
                    </div>
                </div>
            </header>
            
            {/* Category Navigation Bar */}
            <nav className="categories-bar">
                <ul className="categories-list">
                    {categories.map((category, index) => (
                        <li key={index}
                            className="category-item"
                            onMouseEnter={() => setActiveCategory(category.name)}
                            onMouseLeave={() => setActiveCategory(null)}
                        >
                            <span>{category.name}</span>
                            {activeCategory === category.name && (
                                <ul className="subcategories-list">
                                    {category.subcategories.map((sub, subIndex) => (
                                        <li key={subIndex}
                                            className="subcategory-item"
                                            onClick={() => handleSubcategoryClick(category, sub)}
                                        >
                                            {sub.name}
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
