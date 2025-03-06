import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  const token = localStorage.getItem('token'); // Get token from localStorage

  useEffect(() => {
    if (!id || !token) {
      console.error('No user ID or token found in localStorage');
      navigate('/login'); // Redirect to login if no token or ID
      return;
    }

    // Fetch user profile with token
    fetch('http://localhost:3000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        const filteredUser = data.filter((user) => user.id === Number(id));
        setUserProfile(filteredUser);
      })
      .catch((error) => {
        console.error('Erreur de chargement de l\'utilisateur:', error);
        if (error.message === 'Unauthorized') {
          alert('Unauthorized: Please log in again.');
          navigate('/login');
        }
      });
  }, [id, token, navigate]); // Added token and navigate as dependencies

  // Fetch articles with token
  useEffect(() => {
    if (!id || !token) return;

    fetch('http://localhost:3000/api/items', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        const filteredArticles = data.filter((article) => article.user_id === Number(id));
        setArticles(filteredArticles);
      })
      .catch((error) => {
        console.error('Erreur de chargement des articles:', error);
        if (error.message === 'Unauthorized') {
          alert('Unauthorized: Please log in again.');
          navigate('/login');
        }
      });
  }, [id, token, navigate]); // Added token and navigate as dependencies

  // Fetch demands (static JSON, no token needed)
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
    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    axios
      .delete(`http://localhost:3000/api/items/${articleId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        alert('Article supprimé 🚮');
        setArticles(articles.filter((article) => article.id !== articleId));
        setSelectedArticle(null); // Close the modal
      })
      .catch((error) => {
        console.error('Erreur lors de la suppression de l\'article:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Unauthorized: Please log in again.');
          navigate('/login');
        } else {
          alert('Échec de la suppression de l\'article.');
        }
      });
  };

  // Render conditionally with loading state
  if (!userProfile.length) {
    return <div>Loading...</div>; // Show loading until user data is fetched
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
              {articles.length > 0 ? (
                articles.map((article) => (
                  <div key={article.id} onClick={() => cardDetailsArticlesClick(article)}>
                    <CardsOffersC
                      title={article.name}
                      author={article.user?.firstname || 'Inconnu'}
                      image={article.picture}
                    />
                  </div>
                ))
              ) : (
                <p>Aucun article publié.</p>
              )}
              {selectedArticle && (
                <div className="modal-demands">
                  <div className="modal-content-demands">
                    <h2>{selectedArticle.name}</h2>
                    <br />
                    <img src={selectedArticle.picture} alt={selectedArticle.name} className="card-image" />
                    <p>{selectedArticle.description}</p>
                    <p>
                      <strong>Par :</strong> {selectedArticle.user?.firstname || 'Inconnu'}
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
              {demandes.length > 0 ? (
                demandes.map((demande) => (
                  <div key={demande.Id} onClick={() => cardDetailsClick(demande)}>
                    <CardsDemandsC
                      title={demande.Title}
                      author={demande.Author}
                      description={demande.Description}
                    />
                  </div>
                ))
              ) : (
                <p>Aucune demande trouvée.</p>
              )}
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
      </div>
    </>
  );
};

export default ProfileC;