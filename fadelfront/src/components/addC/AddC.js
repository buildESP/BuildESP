import React, { useState } from 'react';
import FooterC from '../footerC/FooterC';
import HeaderC from '../headerC/HeaderC';
import './addc.css';

const AddC = () => {
    const [isOffer, setIsOffer] = useState(true); // Détermine si l'on est dans l'onglet Offre ou Demande
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isOffer) {
            console.log('Offre soumise:', { title, description, photo });
        } else {
            console.log('Demande soumise:', { title, description });
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // Pour afficher l'aperçu de l'image
        }
    };

    return (
        <>
            <HeaderC />
            <div className="add-container">
                <div className="title-toggle">
                    <button
                        type="button"
                        className={`toggle-button ${isOffer ? 'active' : ''}`}
                        onClick={() => setIsOffer(true)}
                    >
                        Offre
                    </button>
                    <span className="divider-vertical">|</span>
                    <button
                        type="button"
                        className={`toggle-button ${!isOffer ? 'active' : ''}`}
                        onClick={() => setIsOffer(false)}
                    >
                        Demande
                    </button>
                </div>

                <form className="add-form" onSubmit={handleSubmit}>
                    

                    {isOffer && (
                        <>
                        <div className="input-group">
                        <label htmlFor="title">Titre</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Entrez le titre"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Décrivez votre offre"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                        <div className="input-group photo-upload">
                            <label htmlFor="photo">Photo</label>
                            <input
                                type="file"
                                id="photo"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {photo && <img src={photo} alt="Preview" className="image-preview" />}
                        </div>
                        </>
                    )}
                    {!isOffer && (
                        <>
                            <div className="input-group">
                                <label htmlFor="title">Titre</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Entrez le titre"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Décrivez votre demande"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </>
                        
                        
                    )}

                    <button type="submit" className="submit-button">
                        {isOffer ? 'Publier l\'offre' : 'Publier la demande'}
                    </button>
                </form>
            </div>
            <FooterC />
        </>
    );
};

export default AddC;
