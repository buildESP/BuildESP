import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import CardsOffersC from '../cardsC/CardsOffersC';

const HomeC = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDemand, setSelectedDemand] = useState(null);

    const subcategoryId = localStorage.getItem('subcategory_id');
    const selectedSubcategory = location.state?.selectedSubcategory || 'Toutes les annonces';
    const token = localStorage.getItem('token');

    const handleCardClick = (article) => {
        setSelectedDemand(article);
    };

    const closeModal = () => {
        setSelectedDemand(null);
    };

    const fetchArticles = async () => {
        try {
            setLoading(true);

            const url = subcategoryId && subcategoryId.trim() !== ''
                ? `http://localhost:3000/api/subcategories/${subcategoryId}`
                : 'http://localhost:3000/api/items';

            console.log("Making request to:", url);

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });


            // Vérification si des articles sont retournés
            if (!response.data.items || response.data.items.length === 0) {
                console.log("No articles found.");
                setArticles([]);
                setError("Aucun article trouvé pour cette sous-catégorie.");
                return;
            } else {
                setArticles(response.data.items);
                setError(null);
            }

            if (!Array.isArray(response.data.items)) {
                throw new Error("Invalid response format: 'items' not found.");
            }

            if (!subcategoryId || subcategoryId.trim() === '') {
                localStorage.removeItem('subcategory_id');
            }
        } catch (err) {
            console.error('Erreur lors de la requête Axios:', err);
            if (err.response) {
                console.error('Réponse d\'erreur:', err.response.data);
            }
            if (err.response?.status === 401 || err.response?.status === 403) {
                alert('Unauthorized: Please log in again.');
                navigate('/login');
            } else {
                setError("Erreur lors du chargement des articles.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            alert('Veuillez vous connecter pour accéder à cette page.');
            navigate('/login');
            return;
        }
        fetchArticles();
    }, [subcategoryId, token, navigate]);

    // const filteredArticles = articles.filter((article) => {
    //     const matchesSubcategory = selectedSubcategory === 'Toutes les annonces'
    //         || article?.subcategory?.name === selectedSubcategory;

    //     const matchesSearchQuery = article.name.toLowerCase().includes(searchQuery.toLowerCase());

    //     // Retourne vrai si l'article correspond à la sous-catégorie ET à la recherche par nom
    //     return matchesSubcategory && matchesSearchQuery;
    // });

    return (
        <div>
            <div className='base'>
                <div className='intro'>
                    <div id="textpresentation">
                        <h2>Buildinguerie</h2>
                        <div>
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="search-input"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className='offersList'>
                    <h2>Liste des offres</h2>
                    <h2>Catégorie sélectionnée : {selectedSubcategory}</h2>
                </div>

                <div className="articles-section">
                    {loading ? (
                        <p>Chargement des articles...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        articles.length > 0 ? (
                            articles.map((article) => (
                                <div key={article.id} onClick={() => handleCardClick(article)}>
                                    <CardsOffersC
                                        title={article.name}
                                        author={article.user?.firstname || 'Inconnu'}
                                        image={article.picture}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>Aucun article à afficher.</p>
                        )
                    )}
                </div>


                {selectedDemand && (
                    <div className="modal-demands">
                        <div className="modal-content-demands">
                            <img id="articleHome" src={selectedDemand.picture} alt="Article" />
                            <h2>{selectedDemand.name}</h2><br />
                            <p><strong>Nom :</strong> {selectedDemand.user?.lastname || 'N/A'}</p>
                            <p><strong>Prénom :</strong> {selectedDemand.user?.firstname || 'N/A'}</p>
                            <p><strong>Adresse email :</strong> {selectedDemand.user?.email || 'N/A'}</p>
                            <p><strong>Numéro de téléphone :</strong> {selectedDemand.user?.phone || 'N/A'}</p>
                            <button className="close-button-demands" onClick={closeModal}>Fermer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeC;