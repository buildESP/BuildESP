import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editProfile.css';

const EditProfileC = () => {
  const [userProfile, setUserProfile] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    adresse: '',
    codePostal: '',
    numeroDeTelephone: '',
    rating: null,
    urlImg: '',
    isAdmin: null,
  });

  const [profilePicture, setProfilePicture] = useState(null);
  const userId = localStorage.getItem('userId'); // Get the user ID from localStorage
  const token = localStorage.getItem('token'); // Get the token from localStorage

  // Fetch user profile with token
  useEffect(() => {
    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    axios
      .get(`http://localhost:3000/api/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        const user = response.data;
        setUserProfile(user);
        setProfilePicture(user.picture);

        // Initialize formData with user profile values
        setFormData({
          nom: user.lastname || '',
          prenom: user.firstname || '',
          email: user.email || '',
          motDePasse: 'password', // Consider not pre-filling password for security
          adresse: user.address || '',
          codePostal: user.postcode || '',
          numeroDeTelephone: user.phone || '',
          rating: user.rating || '',
          urlImg: user.picture || '',
          isAdmin: user.isAdmin || '',
        });
      })
      .catch((error) => {
        console.error('Erreur de chargement de l\'utilisateur:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Unauthorized: Please log in again.');
          navigate('/login');
        }
      });
  }, [userId, token, navigate]);

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
      const newPicture = URL.createObjectURL(file); // Generate a preview URL for the image
      setProfilePicture(newPicture);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!token) {
      alert('Please log in first.');
      navigate('/login');
      return;
    }

    const updatedData = {
      firstname: formData.prenom,
      lastname: formData.nom,
      email: formData.email,
      password: formData.motDePasse,
      address: formData.adresse,
      postcode: formData.codePostal,
      phone: formData.numeroDeTelephone,
      rating: parseFloat(formData.rating), // Ensure rating is a number
      picture: formData.urlImg || profilePicture, // Use URL or uploaded image
      isAdmin: formData.isAdmin === 'true' || formData.isAdmin === true, // Ensure boolean value
    };

    axios
      .put(`http://localhost:3000/api/users/${userId}`, updatedData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log('User profile updated successfully:', response.data);
        navigate('/profile'); // Navigate to profile page after success
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour:', error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          alert('Unauthorized: Please log in again.');
          navigate('/login');
        } else {
          alert('Une erreur est survenue lors de la mise à jour du profil.');
        }
      });
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="profile-picture-section">
          <div className="profile-picture-preview">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt="Profile Preview"
                className="profile-picture-image"
              />
            ) : (
              <span className="profile-picture-placeholder">No image selected</span>
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
          <label htmlFor="urlImg">URL Image:</label>
          <input
            type="url"
            id="urlImg"
            name="urlImg"
            value={formData.urlImg}
            onChange={handleChange}
          />
        </div>

        {/* Hidden fields */}
        <div className="form-group" style={{ display: 'none' }}>
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </div>

        <div className="form-group" style={{ display: 'none' }}>
          <label htmlFor="isAdmin">Is Admin:</label>
          <input
            type="text"
            id="isAdmin"
            name="isAdmin"
            value={formData.isAdmin}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="nav-button">
          Valider
        </button>
        <button onClick={() => navigate(-1)} className="nav-button">
          Retour
        </button>
      </form>
    </div>
  );
};

export default EditProfileC;