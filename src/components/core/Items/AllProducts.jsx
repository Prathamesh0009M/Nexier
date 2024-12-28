
import React, { useEffect, useState } from 'react';
import { fetchAllItems } from "../../../services/operations/itemapi";
import { FaRupeeSign } from "react-icons/fa";
import Heart from "react-heart";
import { useNavigate } from 'react-router-dom';

const AllProducts = () => {
    const [itemData, setItemData] = useState([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (itemData.length === 0) {
                const res = await fetchAllItems();
                // Ensure res is a valid array, otherwise set an empty array as fallback
                setItemData(Array.isArray(res) ? res : []);
            }
        };
        fetchData();
    }, []);
    


    const navigate = useNavigate();

    const handleOnClick = async (itemId, owner) => {
        // Navigate to item detail page
        navigate(`/item/${itemId}/owner/${owner}`);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {itemData.length > 0 ? (
                itemData.map((item) => (
                    <div
                        key={item._id}
                        className="relative bg-gray-800 text-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl hover:border-b-4 hover:border-r-4 hover:border-gray-600"
                        onClick={() => handleOnClick(item._id, item.owner)}
                    >
                          <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-md shadow-md">
                            Click Me
                        </div>
                        <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />
                     
                        <div className="p-6 bg-richblack-700 border-t-2 border-gray-600">
                            <h3 className="text-2xl font-bold mb-2 text-gray-100">{item.title}</h3>
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
                                    Rental Available: {item.rentalDuration} at ₨ {item.rentalPrice} per {item.rentalDuration}
                                </div>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="col-span-full text-center text-gray-400">No items available</p>
            )}
        </div>
    );
};

export default AllProducts;
