import React, { useState } from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import Heart from 'react-heart';
import { Link } from 'react-router-dom';

const Card = ({ item }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="relative bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-b-4 hover:border-r-4 hover:border-gray-600">
            <Link to={`/item/${item._id}/owner/${item.owner}`}>
                <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
            </Link>
            <Heart
                className="absolute top-4 right-4 w-[23px] h-[23px] z-10"
                isActive={active}
                onClick={() => setActive(!active)}
            />
            <div className="p-6 bg-richblack-700 border-t-2 border-gray-600">
                <h2 className="text-2xl font-bold mb-2 text-gray-100">{item.title}</h2>
                <p className="text-gray-300 mb-4">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold flex items-center text-gray-100">
                        <FaRupeeSign />
                        {item.price}
                    </span>
                    <span className={`px-2 py-1 text-sm font-semibold rounded-full ${item.status === 'Available' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'}`}>
                        {item.status}
                    </span>
                </div>
                <div className="flex justify-between text-gray-400 text-sm mb-2">
                    <span>Views: {item.views}</span>
                    <span>Condition: {item.condition}</span>
                </div>
                {item.rentalAvailable === 'Available' && (
                    <div className="mt-2 p-2 bg-yellow-600 text-yellow-100 text-sm rounded-lg">
                        Rental Available: {item.rentalDuration} at ${item.rentalPrice} per {item.rentalDuration}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Card;
