import React from 'react';
import { Link } from 'react-router-dom';
import { useI18n } from '../../i18n';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import './HomePage.css';

const HomePage = () => {
    const { t } = useI18n();

    return (
        <div className="home-page">
            <div className="language-selector-container">
                <LanguageSelector />
            </div>
            <div className="home-container">
                <h1 className="home-title">{t('home.title')}</h1>
                <p className="home-description">
                    {t('home.description')}
                </p>
                <div className="links-container">
                    <Link to="/sin-accesibilidad" className="home-link">
                        {t('home.withoutAccessibility')}
                    </Link>
                    <Link to="/con-accesibilidad" className="home-link">
                        {t('home.withAccessibility')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
