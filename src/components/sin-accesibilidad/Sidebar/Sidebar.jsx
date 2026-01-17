import React from 'react';
import TreeView from '../TreeView/TreeView';
import styles from './Sidebar.module.css';

const Sidebar = ({ appState }) => {
    return (
        <div className={`${styles.sidebar} ${appState.sidebarCollapsed ? styles.collapsed : ''}`}>
            <TreeView 
                onSelectMovie={appState.selectMovie} 
                selectedMovieId={appState.selectedMovie}
            />
        </div>
    );
};

export default Sidebar;
