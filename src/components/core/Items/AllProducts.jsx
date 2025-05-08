
import React, { useEffect, useState } from 'react';
import { fetchAllItems } from "../../../services/operations/itemapi";
import { FaRupeeSign, FaEye, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdLocalOffer, MdVerified } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [itemData, setItemData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            if (itemData.length === 0) {
                const res = await fetchAllItems();
                setItemData(Array.isArray(res) ? res : []);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleOnClick = async (itemId, owner) => {
        navigate(`/item/${itemId}/owner/${owner}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 my-6">
            {itemData.length > 0 ? (
                itemData.map((item) => (
                    <div
                        key={item._id}
                        className="group bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 text-white 
                                 rounded-xl overflow-hidden transition-all duration-500 
                                 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] 
                                 transform hover:-translate-y-2 cursor-pointer
                                 border border-purple-500/10 mb-4"
                        onClick={() => handleOnClick(item._id, item.owner)}
                    >
                        <div className="relative overflow-hidden">
                            <img 
                                src={item.thumbnail} 
                                alt={item.title} 
                                className="w-full h-48 sm:h-56 object-cover transition-all duration-700 
                                         group-hover:scale-110"
                            />
                            <div className="absolute top-4 left-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full 
                                    ${item.status === 'Available' 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                                        : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'} 
                                    shadow-lg backdrop-blur-sm`}>
                                    {item.status === 'Available' ? 
                                        <><MdVerified className="inline mr-1" />In Stock</> : 
                                        'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            <h3 className="text-xl md:text-2xl font-extrabold 
                                         bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400
                                         bg-clip-text text-transparent
                                         hover:from-blue-300 hover:via-purple-300 hover:to-pink-300
                                         transition-all duration-300 truncate
                                         tracking-wide font-poppins">
                                {item.title}
                            </h3>
                            
                            <div className="flex justify-between items-center text-sm text-gray-300">
                                <div className="flex items-center gap-2">
                                    <FaEye className="text-gray-400" />
                                    <span>{item.views} views</span>
                                </div>
                                <span className="text-gray-300">
                                    Condition: {item.condition}
                                </span>
                            </div>

                            <p className="text-gray-300 text-sm line-clamp-2">
                                {item.description}
                            </p>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex items-center text-2xl font-bold text-green-400">
                                    <FaRupeeSign className="text-xl" />
                                    {item.price.toLocaleString()}
                                </div>
                            </div>

                            {item.rentalAvailable === 'Available' && (
                                <div className="mt-4 p-3 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 
                                              rounded-lg border border-yellow-500/20">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <MdLocalOffer className="text-yellow-400" />
                                            <span className="text-yellow-300 font-medium">Rental Available</span>
                                        </div>
                                        <span className="text-yellow-300 text-sm font-semibold">
                                            ₹{item.rentalPrice}/{item.rentalDuration}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 flex justify-center border-t border-gray-700/50">
                                <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 
                                                 rounded-full text-white font-medium
                                                 hover:from-purple-600 hover:to-pink-600 
                                                 transition-all duration-300">
                                    <FaShoppingCart className="inline mr-2" /> View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-900/20 to-pink-900/20 
                                  rounded-full flex items-center justify-center mb-4 animate-pulse">
                        <FaShoppingCart className="text-6xl text-purple-400" />
                    </div>
                    <p className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 
                                 bg-clip-text text-lg font-medium">
                        No items available at the moment
                    </p>
                </div>
            )}
        </div>
    );
};

export default AllProducts;
