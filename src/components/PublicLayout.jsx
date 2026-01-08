import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation.jsx';

const PublicLayout = ({ language, toggleLanguage }) => {
    return (
        <>
            <Navigation language={language} toggleLanguage={toggleLanguage} />
            <Outlet />
        </>
    );
};

export default PublicLayout;
