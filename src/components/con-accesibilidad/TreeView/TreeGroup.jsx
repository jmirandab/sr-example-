import React, { useState } from 'react';
import TreeItem from './TreeItem';
import './TreeView.css';

const TreeGroup = ({ genre, movies, onSelectMovie, selectedMovieId }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleExpand();
        }
    };

    return (
        <div className="tree-group">
            <div 
                className="tree-parent" 
                onClick={toggleExpand}
                role="button"
                aria-expanded={isExpanded}
                tabIndex="0"
                onKeyDown={handleKeyDown}
                aria-label={`Género ${genre}`}
            >
                <span className={`tree-icon ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">▶</span>
                <span className="tree-label">{genre}</span>
            </div>
            {isExpanded && (
                <div 
                    className="tree-children"
                    role="group" 
                    aria-label={`Películas de ${genre}`}
                >
                    {movies.map(movie => (
                        <TreeItem 
                            key={movie.id} 
                            movie={movie} 
                            onSelect={onSelectMovie} 
                            isSelected={selectedMovieId === movie.id}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TreeGroup;
