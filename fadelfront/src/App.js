import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DemandP from './pages/demandP/DemandP';
import HomeP from './pages/homeP/HomeP';
import LoginP from './pages/loginP/LoginP'
import ProfilP from './pages/profilP/ProfilP';


const App = () => {

    return (
        <Routes>
            <Route path="/" element={<HomeP />} />
            <Route path="/home" element={<HomeP />} />
            <Route path="/login" element={<LoginP />} />
            <Route path="/profil" element={<ProfilP />} />
            <Route path="/onDemand" element={<DemandP />} />


            {/* Si jamais ce n'est pas un path correct */}
            <Route path="*" element={<HomeP />} />
        </Routes>
    );
};

export default App;