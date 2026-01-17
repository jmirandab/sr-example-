import React, { useState, useEffect } from 'react';
import { getTranslatedMoviesByGenre } from '../../../data/moviesTranslations';
import { useI18n } from '../../../i18n';
import styles from './TreeView.module.css';

const TreeView = ({ onSelectMovie, selectedMovieId: parentSelectedMovieId }) => {
    const { t } = useI18n();
    const peliculas = getTranslatedMoviesByGenre(t);
    const [expandedGroups, setExpandedGroups] = useState({});
    const [selectedMovieId, setSelectedMovieId] = useState(parentSelectedMovieId);

    // Sync with parent state
    useEffect(() => {
        setSelectedMovieId(parentSelectedMovieId);
    }, [parentSelectedMovieId]);

    // Auto-select first movie on mount if none selected
    useEffect(() => {
        if (!parentSelectedMovieId) {
            const firstGenre = Object.keys(peliculas)[0];
            const firstMovie = peliculas[firstGenre][0];
            
            if (firstMovie) {
                // Expand first genre
                setExpandedGroups({ [firstGenre]: true });
                // Select first movie
                setSelectedMovieId(firstMovie.id);
                onSelectMovie(firstMovie.id);
            }
        } else {
            // Find which genre contains the selected movie and expand it
            Object.keys(peliculas).forEach(genre => {
                if (peliculas[genre].some(movie => movie.id === parentSelectedMovieId)) {
                    setExpandedGroups(prev => ({ ...prev, [genre]: true }));
                }
            });
        }
    }, [onSelectMovie, parentSelectedMovieId, peliculas]);

    const toggleGroup = (genre) => {
        setExpandedGroups(prev => ({
            ...prev,
            [genre]: !prev[genre]
        }));
    };

    const handleMovieSelect = (movieId) => {
        setSelectedMovieId(movieId);
        onSelectMovie(movieId);
    };

    return (
        <div className={styles.treeView}>
            {Object.keys(peliculas).map((genre) => {
                const genreId = genre.toLowerCase().replace(/\s+/g, '-');
                const isExpanded = expandedGroups[genre];
                
                return (
                                    <div key={genre} className={styles.treeGroup}>
                        <div 
                            className={styles.groupHeader}
                            onClick={() => toggleGroup(genre)}
                        >
                            <span className={`${styles.groupIcon} ${isExpanded ? styles.expanded : ''}`}>▶</span>
                            <span className={styles.treeLabel}>{genre}</span>
                        </div>
                        <div 
                            className={`${styles.groupItems} ${isExpanded ? styles.expanded : ''}`}
                            id={genreId}
                        >
                            {peliculas[genre].map(movie => (
                                <div 
                                    key={movie.id} 
                                    className={`${styles.treeItem} ${selectedMovieId === movie.id ? styles.selected : ''}`}
                                    data-movie={movie.id}
                                    onClick={() => handleMovieSelect(movie.id)}
                                >
                                    <span className={styles.treeConnector}></span>
                                    <span className={styles.treeLabel}>{movie.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default TreeView;
