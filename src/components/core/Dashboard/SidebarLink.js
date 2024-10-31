import React from 'react'
import * as Icons from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { matchPath, NavLink, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName]; // Access the icon component directly
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
            return matchPath({ path: route }, location.pathname);
    };

    return (
        <NavLink
            to={link.path}
            className={`text-white relative px-8 py-2 text-sm font-medium ${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}`}
            // Add your onClick logic here
            // onClick={() => {/* Your logic */}}
        >
            <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ? "opacity-100" : "opacity-0"}`}></span>
        
            <div className='flex items-center gap-x-2'>
                {Icon && <Icon className="text-lg" />} {/* Render the icon if it exists */}
                <span>{link.name}</span>
            </div>
        </NavLink>
    );
};

export default SidebarLink;
