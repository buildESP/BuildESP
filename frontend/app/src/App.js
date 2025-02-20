import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import FooterC from './components/footerC/FooterC';
import HeaderC from './components/headerC/HeaderC';
import AddP from './pages/addP/AddP';
import DemandP from './pages/demandP/DemandP';
import EditProfileP from './pages/editProfileP/EditProfileP';
import HomeP from './pages/homeP/HomeP';
import LoginP from './pages/loginP/LoginP';
import MessagesP from './pages/messagesP/MessagesP';
import ProductDetailsP from './pages/productDetailsP/ProductDetailsP';
import ProfileP from './pages/profileP/ProfileP';

const App = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('Token'));

  // Afficher l'IP du backend dans la console
  useEffect(() => {
    console.log('Backend IP:', process.env.REACT_APP_BACKEND_IP);  // Affichage de l'IP
  }, []);

  // Mise à jour de accessToken lors des modifications du localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('Token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange); // Nettoyer l'écouteur
    };
  }, []);

  return (
    <>
      {accessToken && <HeaderC />}
      <Routes>
        {/* Si le token n'existe pas ou est null, afficher uniquement la route de login */}
        {!accessToken ? (
          <>
            <Route path="*" element={<LoginP />} />
            <Route path="/login" element={<LoginP />} />
          </>
        ) : (
          <>
            {/* Routes pour les utilisateurs connectés */}
            <Route path="/" element={<HomeP />} />
            <Route path="/home/:category/:subcategory" element={<HomeP />} />
            <Route path="/home" element={<HomeP />} />
            <Route path="/profile" element={<ProfileP />} />
            <Route path="/editprofile" element={<EditProfileP />} />
            <Route path="/productDetails/:id" element={<ProductDetailsP />} />
            <Route path="/onDemand" element={<DemandP />} />
            <Route path="/messages" element={<MessagesP />} />
            <Route path="/addAnAnnounce" element={<AddP />} />
            <Route path="/category/*" element={<HomeP />} />
            
            {/* Route par défaut pour les chemins incorrects */}
            <Route path="*" element={<HomeP />} />
          </>
        )}
      </Routes>
      {accessToken && <FooterC />}
    </>
  );
};

export default App;
