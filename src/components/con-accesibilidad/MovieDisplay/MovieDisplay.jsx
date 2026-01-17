import React from 'react';
import { getTranslatedMovies } from '../../../data/moviesTranslations';
import { useI18n } from '../../../i18n';
import styles from './MovieDisplay.module.css';

const MovieDisplay = ({ appState }) => {
    const { t } = useI18n();
    const movies = getTranslatedMovies(t);
    
    // Find the selected movie
    const selectedMovie = movies.find(movie => movie.id === appState.selectedMovie);

    if (!selectedMovie) {
        return null; // Don't show anything if no movie is selected
    }

    // Person head icon as SVG for fallback
    const PersonIcon = () => (
        <svg width="60" height="60" viewBox="0 0 24 24" fill="#ccc" role="img" aria-label={t('movie.actor')}>
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
    );

    return (
        <div className={styles.movieDisplay} id="movieDisplay" role="region" aria-label={t('movie.selected')}>
            <h2 className={styles.movieHeader}>{t('movie.selected')}</h2>
            <div className={styles.movieContent}>
                <div className={styles.movieLeft}>
                    <div className={styles.movieInfo} aria-atomic="true" aria-live="assertive">
                        <h3 className={styles.movieTitle} id="movieTitle" aria-label={`${t('movie.selected')} ${selectedMovie.title}`}>{selectedMovie.title}</h3>
                    </div>
                    <div className={styles.movieImage}>
                        <img 
                            id="movieImage" 
                            src={selectedMovie.image} 
                            alt={`Poster de la película ${selectedMovie.title}`} 
                        />
                    </div>
                </div>
                <div className={`${styles.movieRight} ${styles.movieDetails}`}>
                    <div className={styles.movieDescription}>
                        <p className={styles.descriptionText}>{selectedMovie.description}</p>
                    </div>
                    <div className={styles.movieCast} role="region" aria-label={t('movie.cast')}>
                        <ul className={styles.castList}>
                            {selectedMovie.cast.map((person, index) => (
                                <li key={index} className={styles.castCard}>
                                    <div className={styles.castPhoto}>
                                        {person.profilePicture ? (
                                            <img 
                                                src={person.profilePicture} 
                                                alt={`Foto de ${person.name}`}
                                                className={styles.profileImage}
                                            />
                                        ) : (
                                            <PersonIcon />
                                        )}
                                    </div>
                                    <div className={styles.castInfo}>
                                        <div className={styles.castName}>{person.name}</div>
                                        <div className={styles.castRole}>
                                            {person.role === 'director' ? t('movie.director') : t('movie.actor')}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDisplay;
