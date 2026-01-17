import React, { useEffect, useState } from 'react';
import { getTranslatedMovies } from '../../../data/moviesTranslations';
import { useI18n } from '../../../i18n';

const ResultDialog = ({ appState }) => {
    const { t } = useI18n();
    const movies = getTranslatedMovies(t);
    const [isOpen, setIsOpen] = useState(false);
    const [dialogData, setDialogData] = useState(null);

    useEffect(() => {
        // Check URL parameters on mount
        const urlParams = new URLSearchParams(window.location.search);
        
        if (urlParams.has('nombre')) {
            const data = {
                nombre: urlParams.get('nombre'),
                provincia: urlParams.get('provincia'),
                fecha: urlParams.get('fecha'),
                tecnologiaAsistiva: urlParams.get('tecnologia-asistiva')
            };
            setDialogData(data);
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        // Clear URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate();
        const month = t(`months.${date.getMonth()}`);
        const year = date.getFullYear();
        return `${day} de ${month} de ${year}`;
    };

    const getProvinceName = (value) => {
        return t(`provinces.${value}`) || value;
    };

    const getSelectedMovie = () => {
        if (!appState.selectedMovie) return null;
        return movies.find(movie => movie.id === appState.selectedMovie);
    };

    // Add key event handler for escape key
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen]);

    if (!isOpen || !dialogData) return null;

    const selectedMovie = getSelectedMovie();

    return (
        <dialog 
            className="result-dialog" 
            open={isOpen}
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDesc"
        >
            <div className="dialog-content">
                <h2 className="dialog-header" id="dialogTitle">{t('dialog.successTitle')}</h2>
                <div className="dialog-body" id="dialogDesc">
                    {selectedMovie && (
                        <div className="dialog-movie-section">
                            <h3 className="dialog-movie-header">{t('dialog.movieSection')}</h3>
                            <div className="dialog-movie-content">
                                <img 
                                    src={selectedMovie.image} 
                                    alt={`Poster de ${selectedMovie.title}`} 
                                    className="dialog-movie-image"
                                />
                                <div className="dialog-movie-title">{selectedMovie.title}</div>
                            </div>
                        </div>
                    )}
                    
                    {dialogData.nombre && (
                        <div className="dialog-field">
                            <div className="dialog-label">{t('dialog.name')}:</div>
                            <div className="dialog-value">{dialogData.nombre}</div>
                        </div>
                    )}
                    
                    {dialogData.provincia && (
                        <div className="dialog-field">
                            <div className="dialog-label">{t('dialog.province')}:</div>
                            <div className="dialog-value">{getProvinceName(dialogData.provincia)}</div>
                        </div>
                    )}
                    
                    {dialogData.fecha && (
                        <div className="dialog-field">
                            <div className="dialog-label">{t('dialog.date')}:</div>
                            <div className="dialog-value">{formatDate(dialogData.fecha)}</div>
                        </div>
                    )}
                    
                    {dialogData.tecnologiaAsistiva && (
                        <div className="dialog-field">
                            <div className="dialog-label">Tecnología asistiva:</div>
                            <div className="dialog-value">
                                {dialogData.tecnologiaAsistiva === 'audifonos-con-audio-descriptivo' && 'Audífonos con audio descriptivo'}
                                {dialogData.tecnologiaAsistiva === 'audifonos-con-control-independiente' && 'Audífonos con control independiente de efectos, diálogos y música'}
                                {dialogData.tecnologiaAsistiva === 'transcripciones' && 'Transcripciones en su teléfono inteligente'}
                            </div>
                        </div>
                    )}
                </div>
                <div className="dialog-actions">
                    <button 
                        className="dialog-close" 
                        id="closeDialog" 
                        onClick={handleClose}
                        aria-label={t('common.close')}
                    >
                        {t('common.close')}
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default ResultDialog;
