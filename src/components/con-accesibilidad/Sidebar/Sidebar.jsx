import React from 'react';
import TreeView from '../TreeView/TreeView';
import styles from './Sidebar.module.css';

const Sidebar = ({ appState }) => {
    return (
        <div 
            id="sidebar-treeview"
            className={`${styles.sidebar} ${appState.sidebarCollapsed ? styles.collapsed : ''}`}
            aria-hidden={appState.sidebarCollapsed}
            inert={appState.sidebarCollapsed ? '' : undefined}
        >
            <TreeView 
                onSelectMovie={appState.selectMovie} 
                selectedMovieId={appState.selectedMovie}
            />
        </div>
    );
};

export default Sidebar;
