import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import Heart from 'react-heart';

const RelatedItemOfUser = ({ itemData }) => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const handleOnClick = (itemId, owner) => {
        navigate(`/items/${itemId}`);
    };
    
    const itemsToSell = itemData?.owner?.itemsToSell || [];

    return (
        <div className='mt-12 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <h2 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6'>
                    More from {itemData?.owner?.firstName}
                </h2>
                <div className='h-1 w-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8'></div>

                {itemsToSell.length > 0 ? (
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {itemsToSell.map((item) => (
                            <div
                                key={item._id}
                                onClick={() => handleOnClick(item._id, item.owner)}
                                className="group bg-gray-800/90 backdrop-blur-sm rounded-xl overflow-hidden 
                                         transition-all duration-300 hover:scale-[1.02] hover:shadow-xl 
                                         hover:shadow-purple-500/20 border border-purple-500/20"
                            >
                                <div className="relative">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        className="w-full h-56 object-cover transition-transform duration-500 
                                                 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent 
                                                  to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                                    <Heart
                                        className="absolute top-4 right-4 w-[25px] h-[25px] z-10 transition-transform 
                                                 duration-300 hover:scale-110"
                                        isActive={active}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActive(!active);
                                        }}
                                    />
                                    <div className="absolute bottom-4 right-4">
                                        <span className={`px-3 py-1.5 text-sm font-semibold rounded-full 
                                                      ${item.status === 'Available' 
                                                        ? 'bg-green-500/80 text-white' 
                                                        : 'bg-red-500/80 text-white'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-3">
                                    <h3 className="text-xl font-bold text-white truncate group-hover:text-purple-400 
                                                 transition-colors duration-300">
                                        {item.title}
                                    </h3>
                                    
                                    <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                                    
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-green-400 flex items-center">
                                                <FaRupeeSign className="text-xl" />
                                                {item.price}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 text-sm">
                                            <span>👁 {item.views}</span>
                                        </div>
                                    </div>

                                    {item.rentalAvailable === 'Available' && (
                                        <div className="mt-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                                            <p className="text-yellow-400 text-sm">
                                                Rental: {item.rentalDuration} at ₹{item.rentalPrice}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-400">
                        <p className="text-xl">No more items from {itemData?.owner?.firstName}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RelatedItemOfUser;

