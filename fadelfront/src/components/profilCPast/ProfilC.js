import React, { useEffect, useState } from 'react';
import CardsOffersC from '../cardsC/CardsOffersC';
import "./profile.css";

const ProfilC = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('./json/articles.json')
            .then((response) => response.json())
            .then((data) => {
                const filteredArticles = data.filter(article => article.author === "John Doe");
                setArticles(filteredArticles);
            })
            .catch((error) => console.error('Erreur de chargement des articles:', error));
    }, []);
// ./media/pics/photoprofilexample.jpg
    return (
        <>
            <div className="profile-container">
            <div className="profile-card">
                <img
                    src="./media/pics/photoprofilexample.jpg"
                    alt="Profil"
                    className="profile-img"
                />
                <h2 className="profile-name">John Doe</h2>
                <p className="profile-description">Développeur Front-end</p>
            </div>
            
            <div className="articles-container">
                <h3>Articles publiés</h3>
                <div className="articles-list">
                    {articles.map((article) => (
                        <CardsOffersC
                            key={article.id}
                            title={article.title}
                            author={article.author}
                            image={article.image}
                        />
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default ProfilC;
