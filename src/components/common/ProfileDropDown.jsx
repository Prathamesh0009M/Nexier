// ProfileDropdown.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { GoPerson } from 'react-icons/go';
import { RiArrowDownSLine } from 'react-icons/ri';
import { FaCogs, FaSignOutAlt, FaHeart } from 'react-icons/fa';

const ProfileDropdown = () => {
    return (
        <div className='relative'>

            
            <div className='flex items-center gap-x-1 cursor-pointer'>
                <GoPerson className='text-3xl' />
                <RiArrowDownSLine className='text-3xl' />
            </div>
            <div className='absolute right-0 mt-2 w-48 bg-white text-black border border-gray-300 rounded-md shadow-lg'>
                <div className='p-4 border-b border-gray-300'>
                    <Link to="/profile" className='flex items-center gap-x-2 py-2 hover:bg-gray-100'>
                        <GoPerson className='text-lg' />
                        <span>View Profile</span>
                    </Link>
                    <Link to="/profile/edit" className='flex items-center gap-x-2 py-2 hover:bg-gray-100'>
                        <FaCogs className='text-lg' />
                        <span>Edit Profile</span>
                    </Link>
                </div>
                <Link to="/settings" className='flex items-center gap-x-2 py-2 hover:bg-gray-100'>
                    <FaCogs className='text-lg' />
                    <span>Settings</span>
                </Link>
                <Link to="/favorites" className='flex items-center gap-x-2 py-2 hover:bg-gray-100'>
                    <FaHeart className='text-lg' />
                    <span>My Favorites</span>
                </Link>
                <button className='w-full text-left py-2 px-4 hover:bg-gray-100' onClick={() => {/* Add logout functionality here */ }}>
                    <FaSignOutAlt className='text-lg inline' />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;
