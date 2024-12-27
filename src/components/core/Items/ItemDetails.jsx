import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {contactSeller,  fetchItemData, view } from "../../../services/operations/itemapi";
import { setItem } from '../../../slices/itemSlice';
import { FaRupeeSign } from "react-icons/fa";
import RelatedItemOfUser from "./RelatedItemOfUser";
import { AiOutlineHeart } from 'react-icons/ai';
import { MdDateRange } from 'react-icons/md';
import IconBtn from '../../common/IconBtn';
import { addToCart } from "../../../slices/cartSlice";
import { followFriend } from '../../../services/operations/profileApi';
import { setUser } from '../../../slices/profileSlice';
import FormModal from './FormModal';



const ItemDetails = () => {
    const { itemId, ownerId } = useParams();
    const dispatch = useDispatch();
    const [itemData, setItemData] = useState(null);
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { cart } = useSelector((state) => state.cart);

    const handleAddToCart = () => {
        if (token) {
            dispatch(addToCart(itemData));
        } else {
            navigate("/login");
        }
    };

    const followingProb = async () => {
        if (!token) {
            navigate("/login");
            return;
        }

        const response = await followFriend(ownerId, token);
        dispatch(setUser(response.data));
    };

    let check = itemData && itemData.owner && itemData.owner.follower?.includes(user?._id);

  const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleSubmitForm = async (formData) => {
        try {
            
            const sellerEmail = itemData?.owner?.email;
            const finalData = { ...formData, sellerEmail };
            
            console.log("notification from the user is ", finalData);

            const response = await contactSeller(finalData);
            console.log(response);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchItemData({ itemId });
                if (res?.data) {
                    dispatch(setItem(res.data));
                    setItemData(res.data);
                    console.log("data of item is ",res.data);
                }
            } catch (e) {
                console.error("Error fetching item data: ", e);
            }

            try {
                await view({ itemId });
            } catch (e) {
                console.error("Error viewing item: ", e);
            }
        };

        fetchData();
    }, [itemId, dispatch]);

  return (
        <div className='mt-4 relative mx-auto flex flex-col w-full max-w-6xl items-center p-4 sm:p-6 bg-gray-800 text-white rounded-lg shadow-lg'>
            <div className='flex flex-col md:flex-row gap-6 w-full'>
                {/* Item Image and Details */}
                <div className='w-full md:w-1/2'>
                    <img src={itemData?.thumbnail} alt="Item Thumbnail" className='w-full h-64 sm:h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105' />
                </div>

                <div className='w-full md:w-1/2 flex flex-col justify-between'>
                    <div>
                        <h1 className='text-2xl sm:text-3xl font-bold mb-4'>{itemData?.title}</h1>
                        <div className='text-sm sm:text-lg mb-4'>
                            <p className='text-gray-400'>Description:</p>
                            <p className='text-gray-300'>{itemData?.description}</p>
                        </div>

                        {itemData?.rentalAvailable === "Available" ? (
                            <div className='bg-yellow-500 p-2 sm:p-4 rounded-lg mb-4'>
                                <p className='font-semibold'>Rent: Available</p>
                                <p className='text-gray-200'>Price: {itemData?.rentalPrice}</p>
                                <p className='text-gray-200'>Duration: {itemData?.rentalDuration}</p>
                            </div>
                        ) : (
                            <div className='bg-red-500 p-2 sm:p-4 rounded-lg mb-4'>
                                <p className='font-semibold'>No Rent Service Available for this Item.</p>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex items-center justify-between'>
                            <p className='text-xl sm:text-2xl flex items-center gap-2'>
                                <FaRupeeSign />
                                {itemData?.price}
                            </p>
                            <div className='flex items-center gap-2'>
                                <AiOutlineHeart className='text-red-500' />
                                <span>{itemData?.views} Views</span>
                            </div>
                        </div>
                        <div className='text-gray-400 flex items-center gap-2'>
                            <MdDateRange />
                            <p>{new Date(itemData?.createdAt).toLocaleDateString()}</p>
                        </div>
                    </div>

                    {/* Add to Cart and Follow Me Buttons in One Row */}
                    <div className='flex justify-between items-center mt-4'>
                        <button 
                            className='px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition transform duration-300 hover:scale-105'
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>

                        <IconBtn
                            text={check ? 'Following..' : 'Follow Me'}
                            onclick={followingProb}
                            disabled={check}
                            customClasses={'ml-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition transform duration-300 hover:scale-105'}
                        />
                    </div>

                    <div className='flex items-center gap-4 mt-4 sm:mt-6'>
                        <img src={itemData?.owner?.image} className='w-12 sm:w-16 h-12 sm:h-16 rounded-full object-cover border-2 border-gray-600' alt="Owner" />
                        <div className='flex flex-col'>
                            <p className='text-lg sm:text-xl font-semibold'>{itemData?.owner?.firstName} {itemData?.owner?.lastName}</p>
                            <p className='text-gray-400 text-sm sm:text-base'>Contact: {itemData?.owner?.email || itemData?.owner?.additionaldetail?.contactNumber || 'N/A'}</p>
                        </div>
                    </div>
                    <h4 className='text-xl mt-4 ml-10'>Follow First To Chat</h4>

                    <button className='mt-4 sm:mt-4 px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition transform duration-300 hover:scale-105'
                        onClick={() => token ? navigate(`/chat`) : navigate("/login")}
                    >
                        Chat with Seller
                    </button>

                    <button
                        onClick={handleOpenModal}
                        className="mt-7 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition transform duration-300 hover:scale-105"
                    >
                        Contact with Seller
                    </button>

                    <FormModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        onSubmit={handleSubmitForm}
                    />
                </div>
            </div>

            {/* Related Items Section */}
            <RelatedItemOfUser itemData={itemData} />
        </div>
    );
}

export default ItemDetails;
