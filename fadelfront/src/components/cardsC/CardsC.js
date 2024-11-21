import React from 'react';
import './card.css';

const CardsC = ({ title, author, image }) => {
    return (
        <div className="card">
            <img src={image} alt={title} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-author">Par : {author}</p>
            </div>
        </div>
    );
};

export default CardsC;