import React, { useEffect, useState } from 'react';
import FooterwavesC from '../footerWavesC/FooterwavesC';
import HeaderC from '../headerC/HeaderC';
import './home.css';
import FooterC from '../footerC/FooterC';
import CardsOffersC from '../cardsC/CardsOffersC';

const HomeC = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('./json/articles.json')
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error('Erreur de chargement des articles:', error));
    }, []);

    return (
        <div>
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
                    <h2>Liste des offres</h2>
                </div>
                
                {/* Section des articles */}
                <div className="articles-section">
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
            <FooterC />

            {/* <FooterwavesC /> */}
        </div>
    );
};

export default HomeC;
