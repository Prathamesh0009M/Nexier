import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/core/Dashboard/Sidebar";

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);

    return (
        <div className='flex min-h-screen'>
            <Sidebar />
            <div className='flex-grow h-full overflow-auto'>
                <div className='mx-auto w-full md:w-11/12 max-w-[1000px] py-10'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
