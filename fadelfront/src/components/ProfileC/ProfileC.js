import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CardsOffersC from '../cardsC/CardsOffersC';
import CardsDemandsC from '../cardsC/CardsDemandsC'
import "./profile.css";

const ProfileC = () => {
  const [articles, setArticles] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null); // État pour la carte sélectionnée
  const [demandes, setDemandes] = useState([]);
  const navigate = useNavigate();

  // Fetch articles.json and filter by author
  useEffect(() => {
    fetch('./json/articles.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredArticles = data.filter(article => article.author === "John Doe");
        setArticles(filteredArticles);
      })
      .catch((error) => console.error('Erreur de chargement des articles:', error));
  }, []);


  // Fetch demandes.json and filter by author
  useEffect(() => {
    fetch('./json/demands.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredDemandes = data.filter(demande => demande.Author === "John Doe");
        setDemandes(filteredDemandes);
      })
      .catch((error) => console.error('Erreur de chargement des demandes:', error));
  }, []);


    const cardDetailsClick = (demande) => {
        setSelectedDemand(demande); // Définit la carte cliquée comme sélectionnée
        console.log(selectedDemand);
    };

    const closeModal = () => {
      setSelectedDemand(null); // Réinitialise la carte sélectionnée
      console.log("Test unitaire");
    };

  const handleCardClick = (article) => {
    navigate(`/productDetails/${article.id}`, { state: { article } });
  };

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <img src="./media/pics/photoprofilexample.jpg" alt="Profil" className="profile-img" />
          <h2 className="profile-name">John Doe</h2>
          <p className="profile-description">Développeur Front-end</p>
          <Link to='/editProfile' className="nav-button">Editer profil</Link>
        </div>
        <div className="articles-container">
        
          <div className="articles-list-container">
            <div className="articles-list">
              <div className="articles-list-title">
                <h3>Articles publiés</h3>
              </div>
              {articles.map((article) => (
                <>
                  <CardsOffersC
                    key={article.id} 
                    title={article.title} 
                    author={article.author} 
                    image={article.image} 
                    onClick={() => handleCardClick(article)}
                  />
                </>
               
              ))}
            </div>
            <div className="articles-list">
              <div className="articles-list-title">
                <h3>Articles demandés</h3>
              </div>
              {demandes.map((demande) => (
                  <div key={demande.Id} onClick={() => cardDetailsClick(demande)}>
                  <CardsDemandsC 
                    key={demande.Id} 
                    title={demande.Title} 
                    author={demande.Author} 
                    description={demande.Description} 
                    onClick={() => handleCardClick(demande)}
                  />
                  </div>
              ))}
            </div>
            {selectedDemand && ( // Affiche la modale si une carte est sélectionnée
                <div className="modal-demands">
                    <div className="modal-content-demands">
                        <h2>{selectedDemand.Title}</h2><br/>
                        <p><strong>Par :</strong> {selectedDemand.Author}</p>
                        <p><strong>Description : </strong>{selectedDemand.Description}</p>
                        <button className="offer-button-demands">Supprimer cette demande</button>
                        <button className="close-button-demands" onClick={closeModal}>Fermer</button>
                    </div>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileC;