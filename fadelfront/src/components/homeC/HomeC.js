import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './home.css';
import CardsOffersC from '../cardsC/CardsOffersC';

const HomeC = () => {

    const [articles, setArticles] = useState([]);
    const location = useLocation();
    const [selectedDemand, setSelectedDemand] = useState(null); // État pour la carte sélectionnée
    const selectedSubcategory = location.state?.selectedSubcategory || 'Toutes les annonces';

    const handleCardClick = (article) => {
        setSelectedDemand(article); // Définit la carte cliquée comme sélectionnée
    };

    const closeModal = () => {
        setSelectedDemand(null); // Réinitialise la carte sélectionnée
    };

    useEffect(() => {
        fetch('./json/articles.json')
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error('Erreur de chargement des articles:', error));
    }, []);

    return (
        <div>
            <div className='base'>
                <div className='intro'>
                    <img src="./media/pics/entraide.png" alt="" id="entraide"/>
                    <div id="textpresentation">
                        <h2>Buildinguerie</h2>
                        <div>
                        <input type="text" placeholder="Rechercher..." className="search-input" />
                        </div>
                    </div>
                    <img src="./media/pics/quartier.webp" alt="" id="quartier" />
                </div>
                
                <div className='offersList'>
                    <h2>Liste des offres</h2>
                    <h2>Catégorie sélectionnée : {selectedSubcategory}</h2>
                </div>
                
                {/* Section des articles */}
                
                <div className="articles-section">
                    {articles.map((article) => (
                        <div key={article.id} onClick={() => handleCardClick(article)}>
                            <CardsOffersC
                                key={article.id}
                                title={article.title}
                                author={article.author}
                                image={article.image}
                            />
                        </div>
                    ))}
                </div>
                {selectedDemand && ( // Affiche la modale si une carte est sélectionnée
                <div className="modal-demands">
                    <div className="modal-content-demands">
                        <img id="articleHome" src={selectedDemand.image} />
                        <h2>{selectedDemand.title}</h2><br/>
                        <p><strong>Par :</strong> {selectedDemand.author}</p>
                        <button className="offer-button-demands">Postuler à l'offre</button>
                        <button className="close-button-demands" onClick={closeModal}>Fermer</button>
                    </div>
                </div>
            )}
            </div>

            {/* <FooterwavesC /> */}
        </div>
    );
};

export default HomeC;
