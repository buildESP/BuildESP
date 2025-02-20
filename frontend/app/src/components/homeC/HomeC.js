import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './home.css';
import CardsOffersC from '../cardsC/CardsOffersC';

const HomeC = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const location = useLocation();
    const [selectedDemand, setSelectedDemand] = useState(null);

    // Récupérer la sous-catégorie à partir du localStorage
    const subcategoryId = localStorage.getItem('subcategory_id');
    const selectedSubcategory = location.state?.selectedSubcategory || 'Toutes les annonces';

    const handleCardClick = (article) => {
        setSelectedDemand(article);
    };

    const closeModal = () => {
        setSelectedDemand(null);
    };

    // Fonction pour récupérer tous les articles
    const fetchArticles = async () => {
        try {
            setLoading(true);

            // Si la sous-catégorie est présente dans le localStorage et non vide, on utilise son ID
            const url = subcategoryId && subcategoryId.trim() !== ''
                ? `http://${process.env.REACT_APP_BACKEND_IP}:3000/api/items/sub/${subcategoryId}`
                : 'http://${process.env.REACT_APP_BACKEND_IP}:3000/api/items'; // Si pas de sous-catégorie, on récupère tous les articles

            const response = await axios.get(url);
            setArticles(response.data);

            // Si on récupère tous les articles, on enlève le subcategory_id du localStorage
            if (!subcategoryId || subcategoryId.trim() === '') {
                localStorage.removeItem('subcategory_id');
            }
        } catch (err) {
            console.error('Erreur lors de la requête Axios:', err);
            setError("Erreur lors du chargement des articles.");
        } finally {
            setLoading(false);
        }
    };

    // Charger les articles à chaque fois que le composant est monté ou que le subcategoryId change
    useEffect(() => {
        fetchArticles();
    }, [subcategoryId]);

    // Fonction de filtrage des articles en fonction du texte de recherche
    const filteredArticles = articles.filter((article) =>
        article.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return <p>Chargement des articles...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    console.log(selectedSubcategory);

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
                                onChange={(e) => setSearchQuery(e.target.value)} // Mise à jour du searchQuery
                            />
                        </div>
                    </div>
                </div>

                <div className='offersList'>
                    <h2>Liste des offres</h2>
                    {selectedSubcategory ? (
                        <h2>Catégorie sélectionnée : {selectedSubcategory}</h2>
                    ) : (
                        <h2>Toutes les annonces</h2>
                    )}
                </div>

                {/* Section des articles */}
                <div className="articles-section">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <div key={article.id} onClick={() => handleCardClick(article)}>
                                <CardsOffersC
                                    key={article.id}
                                    title={article.name}
                                    author={article.user.firstname}
                                    image={article.picture}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Aucun article trouvé.</p>
                    )}
                </div>

                {selectedDemand && (
                    <div className="modal-demands">
                        <div className="modal-content-demands">
                            <img id="articleHome" src={selectedDemand.picture} alt="Article" />
                            <h2>{selectedDemand.name}</h2><br />
                            <p><strong>Nom :</strong> {selectedDemand.user.lastname}</p>
                            <p><strong>Prenom :</strong> {selectedDemand.user.firstname}</p>
                            <p><strong>Adresse email :</strong> {selectedDemand.user.email}</p>
                            <p><strong>Numéro de téléphone :</strong> {selectedDemand.user.phone}</p>

                            <button className="close-button-demands" onClick={closeModal}>Fermer</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomeC;
