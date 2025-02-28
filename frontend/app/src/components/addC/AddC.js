import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './addc.css';

const AddC = () => {
    const [isOffer, setIsOffer] = useState(true);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [photo, setPhoto] = useState(null);
    const [url, setUrl] = useState('');
    const [userID, setUserID] = useState(null);
    const [status, setStatus] = useState('');
    const [categories, setCategories] = useState(null);

    const navigate = useNavigate();

    // Initialize userID and token from localStorage
    useEffect(() => {
        const storedUserID = localStorage.getItem('userId');
        if (storedUserID) {
            setUserID(Number(storedUserID));
        }
    }, []);

    const handleOptionChange = (event) => {
        setCategories(event.target.value);
    };

    const handleOptionChangeStatus = (event) => {
        setStatus(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token'); // Retrieve the token from localStorage

        const postData = {
            user_id: userID,
            subcategory_id: categories,
            name: title,
            description,
            picture: url, // Use the URL input for the picture
            status
        };

        try {
            const response = await axios.post('http://localhost:3000/api/items', postData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Add Bearer token to headers
                    'Content-Type': 'application/json'
                }
            });
            console.log('Response from server:', response.data);
            alert('Data successfully submitted!');
            navigate('/profile');
        } catch (error) {
            console.error('Error posting data:', error);
            if (error.response?.status === 401 || error.response?.status === 403) {
                alert('Unauthorized: Please log in again.');
                navigate('/login'); // Redirect to login if token is invalid/expired
            } else {
                alert('Failed to submit data. Please try again.');
            }
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhoto(URL.createObjectURL(file)); // To display the image preview
        }
    };

    return (
        <>
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

                            <div className="input-group">
                                <label htmlFor="urlimage">URL Image</label>
                                <input
                                    type="text"
                                    id="url"
                                    placeholder="Entrez l'URL de l'image"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                />
                            </div>

                            <div className="input-group" style={{ display: 'none' }}>
                                <label htmlFor="userid">User ID</label>
                                <input
                                    type="number"
                                    id="userid"
                                    placeholder="Entrez l'ID utilisateur"
                                    value={userID}
                                    onChange={(e) => setUserID(Number(e.target.value))}
                                    required
                                    readOnly
                                />
                            </div>

                            <div>
                                <p>Disponibilité</p>
                                <select value={status} onChange={handleOptionChangeStatus}>
                                    <option value="" disabled>
                                        -- Please Choose an Option --
                                    </option>
                                    <option value=""></option>
                                    <option value="Available">Disponible</option>
                                    <option value="Unavailable">Pas disponible</option>
                                </select>
                            </div>

                            <div>
                                <p>Choisissez une catégorie</p>
                                <select value={categories} onChange={handleOptionChange}>
                                    <option value="" disabled>
                                        -- Please Choose an Option --
                                    </option>
                                    <option value=""></option>
                                    <option value="1">Outils</option>
                                    <option value="2">Cuisine</option>
                                    <option value="3">Jardinage</option>
                                    <option value="4">Films</option>
                                    <option value="5">Audio</option>
                                </select>
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
        </>
    );
};

export default AddC;