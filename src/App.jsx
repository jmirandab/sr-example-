import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import './App.css';

// Import components
import HomePage from './components/HomePage/HomePage';
import CinemaBookingPageSinAccesibilidad from './components/sin-accesibilidad/CinemaBookingPage';
import CinemaBookingPageAccesible from './components/con-accesibilidad/CinemaBookingPage';

const App = () => {
    return (
        <I18nProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sin-accesibilidad" element={<CinemaBookingPageSinAccesibilidad />} />
                    <Route path="/con-accesibilidad" element={<CinemaBookingPageAccesible />} />
                </Routes>
            </Router>
        </I18nProvider>
    );
};

export default App;