import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '@/components/AdminNavbar.jsx';

const AdminLayout = () => {
    return (
        <>
            <AdminNavbar />
            <div className="pt-20"> {/* Add padding top to account for fixed navbar */}
                <Outlet />
            </div>
        </>
    );
};

export default AdminLayout;
