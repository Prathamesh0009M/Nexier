import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRupeeSign } from 'react-icons/fa';
import Heart from 'react-heart';

const RelatedItemOfUser = ({ itemData }) => {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();


    const handleOnClick = (itemId, ownerId) => {
        // Navigate to the item details page
        navigate(`/item/${itemId}/owner/${ownerId}`);
    };

    // Extract itemsToSell from itemData
    const itemsToSell = itemData?.owner?.itemsToSell || [];


    // RelatedItemOfUser component
    return (
        <div className='mt-12'>
            <p className='text-xl'>Other Related Products</p>
            <hr className='mb-3' />
            {itemsToSell.length > 0 ? (
                <div className='flex flex-wrap gap-4 justify-center'>
                    {itemsToSell.map((item) => (
                        <div
                            key={item._id}
                            className="relative bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-b-4 hover:border-r-4 hover:border-gray-600"
                            onClick={() => handleOnClick(item._id, item.owner)}
                            style={{ maxWidth: 'calc(50% - 1rem)', flex: '1 1 calc(50% - 1rem)' }}
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-48 object-cover"
                            />
                            <Heart
                                className="absolute top-4 right-4 w-[23px] h-[23px] z-10"
                                isActive={active}
                                onClick={() => setActive(!active)}
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2 text-gray-100 truncate">{item.title}</h3>
                                <p className="text-gray-300 mb-4 overflow-ellipsis overflow-hidden">{item.description}</p>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold flex items-center text-gray-100">
                                        <FaRupeeSign />
                                        {item.price}
                                    </span>
                                    <span
                                        className={`px-2 py-1 text-sm font-semibold rounded-full ${item.status === 'Available'
                                            ? 'bg-green-600 text-green-100'
                                            : 'bg-red-600 text-red-100'
                                            }`}
                                    >
                                        {item.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm mb-2">
                                    <span>Views: {item.views}</span>
                                    <span>Condition: {item.condition}</span>
                                </div>
                                {item.rentalAvailable === 'Available' && (
                                    <div className="mt-2 p-2 bg-yellow-600 text-yellow-100 text-sm rounded-lg">
                                        Rental Available: {item.rentalDuration} at $
                                        {item.rentalPrice} per {item.rentalDuration}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No More Posts Found from {itemData?.owner?.firstName}</div>
            )}
        </div>
    );

};

export default RelatedItemOfUser;
