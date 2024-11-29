import React, { useState } from 'react';
import { Link, useNavigate,navigate } from 'react-router-dom';
import './editProfile.css'; // Import the CSS file

const EditProfileC = () => {


    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        motDePasse: '',
        adresse: '',
        codePostal: '',
        numeroDeTelephone: '',
    });

    const [profilePicture, setProfilePicture] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePicture(URL.createObjectURL(file)); // Generate a preview URL for the image
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to handle form submission
        console.log('Form submitted:', formData);
        if (profilePicture) {
            console.log('Profile picture uploaded');
        }
    };

    return (
        <>
            <div className="edit-profile-container">
                <h2>Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="profile-picture-section">
                        {/* <label htmlFor="profilePicture" className="profile-picture-label">
                            Profile Picture:
                        </label> */}
                        <div className="profile-picture-preview">
                            {profilePicture ? (
                                <img
                                    src={profilePicture}
                                    alt="Profile Preview"
                                    className="profile-picture-image"
                                />
                            ) : (
                                <span className="profile-picture-placeholder">
                                    No image selected
                                </span>
                            )}
                        </div>
                        
                       
                    </div>
                    <div> 
                            <input
                            type="file"
                            id="profilePicture"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="profile-picture-input"
                        />
                        </div>
                    <div className="form-group">
                        <label htmlFor="nom">Nom:</label>
                        <input
                            type="text"
                            id="nom"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="prenom">Prénom:</label>
                        <input
                            type="text"
                            id="prenom"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="motDePasse">Mot de passe:</label>
                        <input
                            type="password"
                            id="motDePasse"
                            name="motDePasse"
                            value={formData.motDePasse}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="adresse">Adresse:</label>
                        <input
                            type="text"
                            id="adresse"
                            name="adresse"
                            value={formData.adresse}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="codePostal">Code postal:</label>
                        <input
                            type="text"
                            id="codePostal"
                            name="codePostal"
                            value={formData.codePostal}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroDeTelephone">Numéro de téléphone:</label>
                        <input
                            type="tel"
                            id="numeroDeTelephone"
                            name="numeroDeTelephone"
                            value={formData.numeroDeTelephone}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="nav-button" >Valider</button>
                    <Link to='/profil' className="nav-button">sauvegarder</Link>
                    <button onClick={() => navigate(-1)} className="nav-button">retour</button>
                </form>
            </div>
        </>
    );
};

export default EditProfileC;
