import React from 'react';
import './cardDemands.css';

const CardsDemandsC = ({ title, author, description }) => {
    return (
        <div className="card-demands">
            <div className="card-content-demands">
                <h3 className="card-title-demands">{title}</h3>
                <p className="card-author-demands">Par : {author}</p>
                <p className="card-author-demands">Description : {description}</p>
            </div>
        </div>
    );
};

export default CardsDemandsC;