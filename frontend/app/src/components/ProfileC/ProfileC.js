import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import CardsOffersC from '../cardsC/CardsOffersC';
import CardsDemandsC from '../cardsC/CardsDemandsC';
import './profile.css';

const ProfileC = () => {
  const [userProfile, setUserProfile] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedDemand, setSelectedDemand] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [demandes, setDemandes] = useState([]);
  const [id, setId] = useState(localStorage.getItem('userId')); // Initialize directly from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      console.error('No ID found in localStorage');
      return;
    }

    // Fetch user profile
    fetch('http://${process.env.BACKEND_IP}:3000/api/users')
      .then((response) => response.json())
      .then((data) => {
        const filteredUser = data.filter((user) => user.id === Number(id));
        setUserProfile(filteredUser);
      })
      .catch((error) => console.error('Erreur de chargement de l utilisateur:', error));
  }, [id]); // Depend on `id` to re-fetch when it changes

  // Fetch articles.json and filter by author
  useEffect(() => {
    if (!id) return;

    fetch('http://${process.env.BACKEND_IP}:3000/api/items')
      .then((response) => response.json())
      .then((data) => {
        const filteredArticles = data.filter((article) => article.user_id === Number(id));
        setArticles(filteredArticles);
      })
      .catch((error) => console.error('Erreur de chargement des articles:', error));
  }, [id]);

  // Fetch demandes.json
  useEffect(() => {
    fetch('./json/demands.json')
      .then((response) => response.json())
      .then((data) => {
        const filteredDemandes = data.filter((demande) => demande.Author === 'John Doe');
        setDemandes(filteredDemandes);
      })
      .catch((error) => console.error('Erreur de chargement des demandes:', error));
  }, []);

  const cardDetailsClick = (demande) => setSelectedDemand(demande);
  const closeModal = () => setSelectedDemand(null);

  const cardDetailsArticlesClick = (article) => setSelectedArticle(article);
  const closeModalArticles = () => setSelectedArticle(null);

  const deleteArticle = (articleId) => {
    axios
      .delete(`http://${process.env.BACKEND_IP}:3000/api/items/${articleId}`)
      .then((response) => {
        alert('Article supprimé 🚮');
        // Update the articles list after deletion
        setArticles(articles.filter((article) => article.id !== articleId));
        setSelectedArticle(null); // Close the modal
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'article:', error);
        alert('Échec de la suppression de l\'article.');
      });
  };

  // Render conditionally to avoid accessing undefined properties
  if (!userProfile[0]) {
    return <div>Loading...</div>; // Show a loading indicator until user data is available
  }

  return (
    <>
      <div className="profile-container">
        <div className="profile-card">
          <img src={userProfile[0].picture} alt="Profil" className="profile-img" />
          <h2 className="profile-name">{userProfile[0].firstname}</h2>
          <p className="profile-description">{Number(userProfile[0].rating)}</p>
          <Link to="/editProfile" className="nav-button">
            Editer profil
          </Link>
        </div>

        <div className="articles-container">
          <div className="articles-list-container">
            <div className="articles-list">
              <div className="articles-list-title">
                <h3>Articles publiés</h3>
              </div>
              {articles.map((article) => (
                <div key={article.id} onClick={() => cardDetailsArticlesClick(article)}>
                  <CardsOffersC
                    key={article.id}
                    title={article.name}
                    author={article.user?.firstname}
                    image={article.picture}
                  />
                </div>
              ))}
              {selectedArticle && (
                <div className="modal-demands">
                  <div className="modal-content-demands">
                    <h2>{selectedArticle.name}</h2>
                    <br />
                    <img src={selectedArticle.picture} alt={selectedArticle.title} className="card-image" />
                    <p>{selectedArticle.description}</p>
                    <p>
                      <strong>Par :</strong> {selectedArticle.user?.firstname}
                    </p>
                    <button
                      className="offer-button-demands"
                      onClick={() => deleteArticle(selectedArticle.id)}
                    >
                      Supprimer cet article
                    </button>
                    <button className="close-button-demands" onClick={closeModalArticles}>
                      Fermer
                    </button>
                  </div>
                </div>
              )}
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
                  />
                </div>
              ))}
            </div>
            {selectedDemand && (
              <div className="modal-demands">
                <div className="modal-content-demands">
                  <h2>{selectedDemand.Title}</h2>
                  <br />
                  <p>
                    <strong>Par :</strong> {selectedDemand.Author}
                  </p>
                  <p>
                    <strong>Description :</strong> {selectedDemand.Description}
                  </p>
                  <button className="offer-button-demands">Supprimer cette demande</button>
                  <button className="close-button-demands" onClick={closeModal}>
                    Fermer
                  </button>
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
