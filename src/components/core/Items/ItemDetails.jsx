import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { contactSeller, fetchItemData, view } from "../../../services/operations/itemapi";
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


    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);
    const handleSubmitForm = async (formData) => {
        try {
            

            const finalData = { ...formData, sellerEmail };
            
            console.log("notification from the user is ", finalData);

            const response = await contactSeller(finalData);
            console.log(response);

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


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
    const sellerEmail = itemData?.owner?.email;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchItemData({ itemId });
                if (res?.data) {
                    dispatch(setItem(res.data));
                    setItemData(res.data);
                    console.log("datya is ", res.data);

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
        <div className='min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900 py-8'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 lg:p-8'>
                    <div className='flex flex-col lg:flex-row gap-8'>
                        {/* Image Section with Enhanced Animation */}
                        <div className='lg:w-1/2'>
                            <div className='relative group overflow-hidden rounded-xl'>
                                <div className='absolute inset-0 bg-gradient-to-r from-purple-500/50 to-pink-500/50 blur-md opacity-0 group-hover:opacity-75 transition-all duration-500'></div>
                                <img 
                                    src={itemData?.thumbnail} 
                                    alt={itemData?.title}
                                    className='w-full h-[400px] object-cover rounded-xl shadow-lg transform transition-all duration-700 group-hover:scale-110'
                                />
                                <div className='absolute top-4 right-4 bg-pink-500/20 p-2 rounded-full backdrop-blur-sm'>
                                    <AiOutlineHeart className='text-2xl text-pink-400 animate-pulse' />
                                </div>
                            </div>
                        </div>

                        {/* Details Section with Enhanced Styling */}
                        <div className='lg:w-1/2 flex flex-col gap-6'>
                            <div className='space-y-4'>
                                {/* Updated Product Title */}
                                <h1 className='text-4xl md:text-5xl font-bold text-white 
                                                 hover:scale-[1.02] transform transition-all duration-300'>
                                    {itemData?.title}
                                </h1>

                                {/* Updated Price, Views, and Date Section */}
                                <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 
                                                  bg-gradient-to-r from-gray-800/50 to-gray-700/50 p-6 rounded-xl 
                                                  border border-purple-500/30'>
                                    <div className='flex-1 space-y-3'>
                                        <div className='text-5xl font-bold flex items-center text-white
                                                      hover:scale-105 transform transition-all duration-300'>
                                            <FaRupeeSign className="mr-1" />
                                            <span>{itemData?.price}</span>
                                        </div>
                                        <div className='flex items-center gap-3 text-gray-300'>
                                            <div className='flex items-center gap-2 bg-purple-500/10 px-4 py-2 
                                                          rounded-full border border-purple-500/30'>
                                                <span className='animate-pulse text-2xl'>👁</span>
                                                <span className='text-lg font-semibold'>{itemData?.views || 0} </span>
                                            </div>
                                            <div className='flex items-center gap-2 bg-blue-500/10 px-4 py-2 
                                                          rounded-full border border-blue-500/30'>
                                                <MdDateRange className="text-blue-400 text-xl" />
                                                <span>{new Date(itemData?.createdAt).toLocaleDateString('en-US', {
                                                    day: 'numeric',
                                                    month: 'short',
                                                    year: 'numeric'
                                                })}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='bg-gray-700/30 rounded-xl p-4'>
                                    <h3 className='text-xl font-semibold text-blue-300 mb-2'>About This Item</h3>
                                    <p className='text-gray-300 leading-relaxed'>{itemData?.description}</p>
                                </div>

                                {/* Important Notice */}
                                <div className='bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/30'>
                                    <h4 className='text-yellow-400 text-lg font-semibold mb-2'>⚠️ Important Notice</h4>
                                    <p className='text-yellow-300'>Follow the seller first to enable chat functionality!</p>
                                </div>

                                {/* Seller Info with Enhanced Design */}
                                <div className='bg-purple-500/10 p-4 rounded-xl border border-purple-500/30'>
                                    <div className='flex items-center gap-4'>
                                        <div className='relative group'>
                                            <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur group-hover:blur-md transition-all duration-300'></div>
                                            <img 
                                                src={itemData?.owner?.image} 
                                                className='relative w-16 h-16 rounded-full object-cover border-2 border-purple-500 transform transition-transform duration-300 group-hover:scale-105' 
                                                alt="Owner" 
                                            />
                                        </div>
                                        <div>
                                            <p className='text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
                                                {itemData?.owner?.firstName} {itemData?.owner?.lastName}
                                            </p>
                                            <p className='text-gray-400'>
                                                {itemData?.owner?.email || itemData?.owner?.additionaldetail?.contactNumber || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons with Enhanced Styling */}
                                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                    <button
                                        onClick={handleAddToCart}
                                        className='group relative px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl 
                                                 overflow-hidden transition-all duration-300'
                                    >
                                        <div className='absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500'></div>
                                        <span className='relative text-white font-semibold'>Add to Cart</span>
                                    </button>

                                    <IconBtn
                                        text={check ? 'Following' : 'Follow Me'}
                                        onclick={followingProb}
                                        disabled={check}
                                        customClasses='group relative px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl 
                                                       overflow-hidden transition-all duration-300 disabled:opacity-50'
                                    />

                                    <button
                                        onClick={() => token ? navigate(`/chat`) : navigate("/login")}
                                        className='group relative px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl 
                                                 overflow-hidden transition-all duration-300'
                                    >
                                        <div className='absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500'></div>
                                        <span className='relative text-white font-semibold'>Chat with Seller</span>
                                    </button>

                                    <button
                                        onClick={handleOpenModal}
                                        className='group relative px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl 
                                                 overflow-hidden transition-all duration-300'
                                    >
                                        <div className='absolute inset-0 bg-white/20 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-500'></div>
                                        <span className='relative text-white font-semibold'>Contact Seller</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Modal */}
                <FormModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitForm}
                />

                {/* Related Items */}
                <div className='mt-12'>
                    <RelatedItemOfUser itemData={itemData} />
                </div>
            </div>
        </div>
    );
};

export default ItemDetails;
