import React from 'react'
import { Link, matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom'
import nexier from "../../asset/Images/nexier.png"
import { NavbarLinks } from "../../data/navbar-link"
import { LuLayoutDashboard } from "react-icons/lu";

import { useState, useEffect } from 'react'
import { RiArrowDownSLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { GoPerson } from "react-icons/go";
import { BsChatDots } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import UpdateSlider from "../../components/UpdateSlider"
import { categoryApi } from "../../services/api"
import { apiConnector } from '../../services/apiConnector'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../services/operations/authApi'
import { setToken, setUser } from "../../slices/profileSlice"
import ConfirmationModal from './ConfirmationModal'
import { VscSignOut, VscThreeBars } from 'react-icons/vsc';
// import { useSelector } from 'react-redux'


const Navbar = () => {
    const [subLinks, setsubLinks] = useState([]);
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.profile);
    const [searchQuery, setSearchQuery] = useState('');  // State to store search input


    // console.log("user all Data ", user);
    const dispatch = useDispatch();

    const location = useLocation();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(logout(navigate)); // Pass navigate to the logout function
        setConfirmationModal(null);
    };


    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categoryApi.GET_ALL_CATEGORY_API)
            // console.log("printing subLinks ", result.data)
            setsubLinks(result.data.data);

        } catch (e) {
            console.log("could not fetch category list", e)
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, [])
    const [togglelog, settogglelog] = useState(false);
    // const { token } = useSelector((state) => state.profile);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log(".........|||||||||||||||||||\.....", token);


        const user = JSON.parse(localStorage.getItem("user"));
        // const token = user.token;

        if (token && user) {
            dispatch(setToken(token));
            dispatch(setUser(user));
            settogglelog(true);
        } else {
            dispatch(setToken(null));
            dispatch(setUser(null));
        }

    }, [dispatch, togglelog]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem("token"));
        // console.log("Token in useEffect: ", token); // Check token value

        const user = JSON.parse(localStorage.getItem("user"));
        if (token && user) {
            // Check if token is expired
            const { exp } = JSON.parse(atob(token.split('.')[1])); // Decode the token to get expiration
            const isExpired = Date.now() >= exp * 1000; // exp is in seconds, convert to milliseconds

            if (isExpired) {
                // If expired, clear local storage and redirect to login
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                dispatch(setToken(null));
                dispatch(setUser(null));
                navigate("/login");
            } else {
                dispatch(setToken(token));
                dispatch(setUser(user));
                settogglelog(true);
            }
        } else {
            dispatch(setToken(null));
            dispatch(setUser(null));
        }
    }, [dispatch, navigate]);



    const handleCategoryChange = (event) => {
        const category = event.target.value;
        if (category) {

            navigate(`/catalog/${category}`);
        }
    };


    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Function to handle search submission
    const handleSearch = (e) => {
        e.preventDefault();

        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);  // Navigate to a search results page with the query
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch(event);
        }
    }
    const [confirmationModal, setConfirmationModal] = useState(null);


    const handleNav = () => {

        // user ? navigate("/dashboard/add-item") : navigate("/login")
        if (user) {
            navigate("/dashboard/add-item")
        } else {
            navigate("/login")
        }

    }

    const matchRoute = (route) => {


        return matchPath({ path: route }, location.pathname);
    }

    return (

        <div>
            <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-600'>

                <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                    <Link to="/">
                        <img src={nexier} width={60} className='rounded-md' height={12} loading='lazy' />

                    </Link>

                    {/* <NavLink  */}

                    <nav>
                        <ul className='flex gap-x-6 text-richblack-25'>
                            {
                                NavbarLinks.map((link, index) => (
                                    <li key={index}>
                                        {
                                            link.title === "Catalog" ? (
                                                <div className='relative  flex items-center gap-2  group'>
                                                    <p>{link.title}</p>
                                                    <RiArrowDownSLine />

                                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[300px]' >

                                                        <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-45%] h-6 w-6 rotate-45 bg-richblack-5'></div>
                                                        {
                                                            subLinks.length ? (
                                                                subLinks.map((sublink, index) => (
                                                                    <Link to={`catalog/${sublink.name.split(" ").join("-").toLowerCase()}`} key={index}
                                                                        className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'


                                                                    >{sublink.name}</Link>
                                                                ))
                                                            ) : (<div>No Category avl</div>)
                                                        }
                                                    </div>

                                                </div>
                                            ) : (
                                                <Link to={link?.path}>
                                                    {/* ye vahi text ko highlight karega jo url path aur navlink ko match karega */}

                                                    <p className={`${matchRoute(link?.path) ? "text-yellow-50" : "text-richblack-25"}`}>{link.title}</p>

                                                </Link>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>

                    {/* Login signUp dashboard  */}
                    <div className=' flex  gap-x-4 items-center'>
                        {/* {
                        // HW:styling is to be

                        user && user.accountType !== "Instructor" && (
                            <Link to="/dashboard/cart" className='relative'>
                                <BsCart3 />
                                {
                                    totalItems > 0 && (
                                        <span>
                                            {totalItems}
                                        </span>
                                    )
                                }
                            </Link>


                        )
                    } */}
                        {
                            token === null && (
                                <Link to="/login">
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py[8px] text-richblack-100 rounded-md'>Sign in</button>
                                </Link>
                            )
                        }
                        {
                            token !== null && (
                                <Link to="/dashboard/my-profile">
                                    <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md flex items-center'>
                                        {/* Show icon only on mobile */}
                                        <span className="block sm:hidden">
                                            <LuLayoutDashboard size={24} />
                                        </span>
                                        {/* Show text on larger screens */}
                                        <span className="hidden sm:block">Dashboard</span>
                                    </button>
                                </Link>
                            )
                        }

                        {/* HW  */}
                        {
                            // token !== null && <ProfileDropDown />
                        }

                        {/* 1:08 */}

                    </div>



                </div>

            </div>
            {/* <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-600'> */}



            <div className='flex flex-col pl-10 md:flex-row items-center justify-between p-4  md:pl-32
            
             w-11/12 max-w-maxContent
            '>
                <div className='mb-1 flex items-center md:flex items-center border-2 border-black rounded-lg p-1'>
                    <input
                        className='w-[330px] items-center md:w-[400px] h-9 text-black pl-3 border-none rounded-l-lg '
                        placeholder='Search Nexier.com'
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <div
                        onClick={handleSearch}
                        className='h-9 w-9 text-sm md:h-9 bg-yellow-300 md:w-11 text-black flex items-center justify-center md:text-2xl cursor-pointer rounded-r-lg'
                    >
                        <HiOutlineSearch />
                    </div>
                </div>


              <div className="flex items-center gap-2 w-full justify-between p-2  md:gap-6 md:p-4">
                         {/* Category Dropdown */}
                      <div className="flex-1 max-w-[150px] md:max-w-[250px]">
                        <select
                                     onChange={handleCategoryChange}
                        className="bg-transparent border border-white text-white cursor-pointer rounded-lg px-2 h-10 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full hover:bg-gray-700 md:h-12"
                        defaultValue=""
                                      >
                              <option className="text-white" value="" disabled>
                                  All Category
                              </option>
                              {subLinks.map((category, index) => (
                                  <option className="text-black" key={index} value={category.slug}>
                                      {category.name}
                                  </option>
                              ))}
                          </select>
                      </div>
                  
                      {/* Sell Button */}
                      <div
                          className="flex items-center justify-center border-2 border-aqua-500 rounded-lg p-1                   cursor-pointer text-white hover:bg-aqua-500 transition duration-300 ease-in-out md:text-lg                   md:px-4 md:h-12"
                          onClick={handleNav}
                      >
                          <FaPlus />
                          <span className="ml-1">SELL</span>
                      </div>
                  
                      {/* Chat Icon */}
                                              <div
                           className="text-2xl text-white cursor-pointer flex items-center hover:text-yellow-400 transition duration-300 ease-in-out md:text-4xl"
                           onClick={() => (token ? navigate("/chat") : navigate("/login"))}
                       >
                           <BsChatDots />
                        </div>

                   {/* Profile Icon */}
                   <div className="relative cursor-pointer flex items-center hover:text-yellow-400 transition duration-300 ease-in-out">
                       {token ? (
                           <div className="flex items-center gap-x-1" onClick={() => setShowDropdown(!showDropdown)}>
                               <GoPerson className="text-white text-2xl md:text-4xl" />
                               {user?.image && (
                                   <img
                                       src={`${user.image}?${new Date().getTime()}`}
                                       alt="Profile"
                                       className="w-6 h-6 rounded-full object-cover md:w-10 md:h-10"
                                   />
                               )}
                           </div>
                       ) : (
                           <div className="flex items-center gap-x-1">
                               <GoPerson className="text-white text-2xl md:text-4xl" />
                               <RiArrowDownSLine className="text-lg md:text-2xl" />
                           </div>
                       )}
                   </div>
    
                </div>
    
                </div>
            <hr className=" border-richblack-500 " />



            {showDropdown && (
                <div className='absolute right-16 mt-2 py-2 w-48 bg-white rounded-lg shadow-lg z-50'>
                    <Link to="/dashboard/my-profile " className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>View and edit profile</Link>

                    <Link to="/dashboard/settings" className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>Settings</Link>
                    <div className='border-t border-gray-100'></div>

                    <button
                        onClick={() => setConfirmationModal({
                            text1: "Are you Sure?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: handleLogout, // This now correctly handles logout
                            btn2Handler: () => setConfirmationModal(null),
                        })}
                        className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex flex-row items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Log out</span>
                        </div>
                    </button>
                </div>
            )}

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        </div>

    )
}
export default Navbar



