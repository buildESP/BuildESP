import React, { useEffect, useState } from 'react';
import CardsDemandsC from '../cardsC/CardsDemandsC';
import FooterC from '../footerC/FooterC';
import HeaderC from '../headerC/HeaderC';
import './../homeC/home.css';
import './demands.css';

const DemandC = () => {

    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState(null); // État pour la carte sélectionnée

    const handleCardClick = (demand) => {
        setSelectedDemand(demand); // Définit la carte cliquée comme sélectionnée
    };

    const closeModal = () => {
        setSelectedDemand(null); // Réinitialise la carte sélectionnée
    };

    useEffect(() => {
        fetch('./json/demands.json')
            .then((response) => response.json())
            .then((data) => setDemands(data))
            .catch((error) => console.error('Erreur de chargement des articles:', error));
    }, []);

    console.log(demands);

    return (
        <>
            <HeaderC />
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
                    <h2>Liste des demandes</h2>
                </div>
                <div className="articles-section-demands">
                    {demands.length > 0 ? (
                        <div className="grid-container-demands">
                            {demands.map((demand) => (
                                <div key={demand.id} onClick={() => handleCardClick(demand)}>
                                <CardsDemandsC
                                    key={demand.id}
                                    title={demand.Title}
                                    author={demand.Author}
                                    description={demand.Description}
                                />
                                </div>

                            ))}
                        </div>
                    ) : (
                        <p>Chargement des demandes...</p>
                    )}
                </div>
                {selectedDemand && ( // Affiche la modale si une carte est sélectionnée
                <div className="modal-demands">
                    <div className="modal-content-demands">
                        <h2>{selectedDemand.Title}</h2><br/>
                        <p><strong>Par :</strong> {selectedDemand.Author}</p>
                        <p><strong>Description : </strong>{selectedDemand.Description}</p>
                        <button className="offer-button-demands">Proposer une offre</button>
                        <button className="close-button-demands" onClick={closeModal}>Fermer</button>
                    </div>
                </div>
            )}

            </div>
            
            <FooterC />
        </>
    );
};

export default DemandC;