import React from 'react';
import { useAppState } from '../../hooks/useAppState';
import { useI18n } from '../../i18n';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import styles from './CinemaBookingPage.module.css';

// Import all components
import Sidebar from './Sidebar/Sidebar';
import MovieDisplay from './MovieDisplay/MovieDisplay';
import BookingForm from './Form/BookingForm';
import ResultDialog from './Dialog/ResultDialog';

const CinemaBookingPage = () => {
    const appState = useAppState();
    const { t } = useI18n();

    return (
        <div className={styles.sinAccesibilidad}>
            {/* Banner superior */}
            <div className={styles.banner}>
                <button className={styles.hamburgerMenu} id="hamburgerMenu" onClick={appState.toggleSidebar}>☰</button>
                <span className={styles.bannerTitle}>{t('banner.title')}</span>
                <div className={styles.languageSelectorWrapper}>
                    <LanguageSelector />
                </div>
            </div>

            <div className={styles.container}>
                {/* Sección izquierda - Tree View */}
                <Sidebar appState={appState} />

                {/* Sección principal */}
                <div className={`${styles.mainContent} ${appState.sidebarCollapsed ? styles.expanded : ''}`}>
                    <div className={styles.pageTitle}>{t('form.title')}</div>
                    
                    <div className={styles.contentWrapper}>
                        {/* Área de película seleccionada */}
                        <div className={styles.columnsContainer}>
                            <MovieDisplay appState={appState} />
                            
                            <BookingForm appState={appState} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Dialog para mostrar resultados */}
            <ResultDialog appState={appState} />
        </div>
    );
};

export default CinemaBookingPage;
