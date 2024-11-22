import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AddP from './pages/addP/AddP';
import DemandP from './pages/demandP/DemandP';
import HomeP from './pages/homeP/HomeP';
import LoginP from './pages/loginP/LoginP'
import MessagesP from './pages/messagesP/MessagesP';
import ProfilP from './pages/profilP/ProfilP';


const App = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeP />} />
            <Route path="/home" element={<HomeP />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/profile" element={<ProfilP />} />
            <Route path="/onDemand" element={<DemandP />} />
            <Route path="/messages" element={<MessagesP />} />
            <Route path="/addAnAnnounce" element={<AddP />} />

            {/* Si jamais ce n'est pas un path correct */}
            <Route path="*" element={<HomeP />} />
        </Routes>
    );
};

export default App;