import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FooterC from './components/footerC/FooterC';
import HeaderC from './components/headerC/HeaderC';
import AddP from './pages/addP/AddP';
import DemandP from './pages/demandP/DemandP';
import EditProfileP from './pages/editProfileP/EditProfileP';
import HomeP from './pages/homeP/HomeP';
import LoginP from './pages/loginP/LoginP'
import MessagesP from './pages/messagesP/MessagesP';
import ProductDetailsP from './pages/productDetailsP/ProductDetailsP';
import ProfileP from './pages/profileP/ProfileP';



const App = () => {

    return (
        <>
            <HeaderC />
            <Routes>
                <Route path="/" element={<HomeP />} />
                <Route path="/home" element={<HomeP />} />
                <Route path="/login" element={<LoginP />} />
                <Route path="/profile" element={<ProfileP />} />
                <Route path="/editprofile" element={<EditProfileP />} />
                <Route path="/productDetails/:id" element={<ProductDetailsP />} />
                <Route path="/onDemand" element={<DemandP />} />
                <Route path="/messages" element={<MessagesP />} />
                <Route path="/addAnAnnounce" element={<AddP />} />
                <Route path="/category/*" element={<HomeP />} />

                {/* Si jamais ce n'est pas un path correct */}
                <Route path="*" element={<HomeP />} />
            </Routes>
            <FooterC />
        </>
    );
};

export default App;