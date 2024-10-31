import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sidebarLinks } from '../../../data/dashboard-link';
import SidebarLink from './SidebarLink';
import { logout } from '../../../services/operations/authApi';
import ConfirmationModal from '../../common/ConfirmationModal';
import { VscSignOut, VscThreeBars } from 'react-icons/vsc';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout(navigate));
        setConfirmationModal(null);
    };

    return (
        <div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden text-white p-4">
                <VscThreeBars className="text-2xl" />
            </button>

            <div className={`${isSidebarOpen ? "flex" : "hidden"} md:flex flex-col min-w-[222px] border-r-[1px] border-r-richblack-700 h-full bg-richblack-800 text-white transition-width duration-300`}>
                <div className='flex flex-col'>
                    {sidebarLinks.map((link) => {
                        // Only render "Add PYQ" link if user is an Admin
                        if (link.type && user?.accountType !== link.type) return null;
                        return <SidebarLink key={link.id} link={link} icon={link.icon} />;
                    })}
                </div>

                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>
                <div className='flex flex-col'>
                    <SidebarLink
                        link={{ name: "Setting", path: "/dashboard/settings" }}
                        iconName="VscSettingGear"
                    />
                    <button
                        onClick={() =>
                            setConfirmationModal({
                                text1: "Are you Sure?",
                                text2: "You will be logged out of your Account",
                                btn1Text: "Logout",
                                btn2Text: "Cancel",
                                btn1Handler: handleLogout,
                                btn2Handler: () => setConfirmationModal(null),
                            })
                        }
                        className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex flex-row items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Log out</span>
                        </div>
                    </button>
                </div>
                {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
            </div>
        </div>
    );
};

export default Sidebar;
