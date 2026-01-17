import React from 'react';

const TreeItem = ({ movie, onSelect, isSelected }) => {
    const handleClick = () => {
        onSelect(movie.id);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(movie.id);
        }
    };

    return (
        <div 
            className={`tree-item ${isSelected ? 'selected' : ''}`} 
            onClick={handleClick} 
            data-movie={movie.id}
            role="button"
            aria-selected={isSelected}
            tabIndex="0"
            onKeyDown={handleKeyDown}
            aria-label={`Película ${movie.title}`}
        >
            <span className="tree-connector" aria-hidden="true"></span>
            <span className="tree-label">{movie.title}</span>
        </div>
    );
};

export default TreeItem;
