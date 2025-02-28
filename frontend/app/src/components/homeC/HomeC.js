import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Added useNavigate
import axios from 'axios';
import './home.css';
import CardsOffersC from '../cardsC/CardsOffersC';

const HomeC = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const navigate = useNavigate(); // Added for navigation
    const [selectedDemand, setSelectedDemand] = useState(null);
    const [article, setArticle] = useState([]);

    const subcategoryId = localStorage.getItem('subcategory_id');
    const selectedSubcategory = location.state?.selectedSubcategory || 'Toutes les annonces';
    const token = localStorage.getItem('token'); // Get token from localStorage

    const handleCardClick = (article) => {
        setSelectedDemand(article);
    };

    const closeModal = () => {
        setSelectedDemand(null);
    };

    // Axios request with token and improved error handling
    const fetchArticles = async () => {
        if (!token) {
            alert('Please log in first.');
            navigate('/login');
            return;
        }

        try {
            setLoading(true);
            const url = subcategoryId && subcategoryId.trim() !== ''
                ? `http://localhost:3000/api/items/sub/${subcategoryId}`
                : 'http://localhost:3000/api/items';
            
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            setArticles(response.data);
            if (!subcategoryId || subcategoryId.trim() === '') {
                localStorage.removeItem('subcategory_id');
            }
        } catch (err) {
            console.error('Erreur lors de la requête Axios:', err);
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

    // Fetch request with token and improved error handling
    useEffect(() => {
        fetchArticles();
    }, [subcategoryId, token, navigate]); // Added token and navigate as dependencies

    useEffect(() => {
        if (!token) {
            console.warn("No token found, skipping fetch.");
            return;
        }

        fetch("http://localhost:3000/api/items", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    throw new Error('Unauthorized');
                }
                return res.json();
            })
            .then(data => setArticle(data))
            .catch(err => {
                console.error('Erreur lors de la requête Fetch:', err);
                if (err.message === 'Unauthorized') {
                    alert('Unauthorized: Please log in again.');
                    navigate('/login');
                }
            });
    }, [token, navigate]); // Added token and navigate as dependencies

    const filteredArticlesBySubcategory = selectedSubcategory === 'Toutes les annonces'
        ? article
        : article.filter(article => article.subcategory?.name === selectedSubcategory);

    const filteredArticlesByName = filteredArticlesBySubcategory.filter(article =>
        article.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                    ) : filteredArticlesByName.length > 0 ? (
                        filteredArticlesByName.map((article) => (
                            <div key={article.id} onClick={() => handleCardClick(article)}>
                                <CardsOffersC
                                    title={article.name}
                                    author={article.user?.firstname || 'Inconnu'}
                                    image={article.picture}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Aucun article trouvé pour cette sous-catégorie.</p>
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