import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { useNavigate } from 'react-router-dom'

const Course_Card = ({ item, Height }) => {
    const [avgReviewCount, setavgReviewCount] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        // Example logic for avgReviewCount if needed
    }, [item]);

    // Function to determine the color for the status
    const getStatusColor = (status) => {
        if (status === 'Available') return 'text-green-500';
        if (status === 'Sold Out') return 'text-red-500';
        return 'text-yellow-500';  // Default for other statuses
    };

    // Function to determine the color for the condition
    const getConditionColor = (condition) => {
        if (condition === 'Like New') return 'text-blue-500';
        if (condition === 'Used') return 'text-gray-500';
        return 'text-purple-500';  // Default for other conditions
    };

    return (
        <div className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">

            <div className="relative">
                <img
                    src={item?.thumbnail}
                    alt='Item Thumbnail'
                    className={`${Height} w-full rounded-lg object-cover`}
                />
            </div>
            <div className="mt-4 space-y-2">
                <p className="text-xl font-semibold text-richblack-50">{item?.title}</p>
                <div className="flex justify-between items-center mt-4 ">
                    <IconBtn customClasses={'h-10'} text={`View Details`} onclick={() => navigate(`/item/${item._id}/owner/${item.owner}`)} />
                </div>
                {/* Status and Views */}
                <div className="flex justify-between items-center">
                    <p className={`${getStatusColor(item?.status)} font-bold`}>
                        Status: {item?.status}
                    </p>
                    <p className="text-richblack-5">
                        Views: {item?.views}
                    </p>

                </div>

                {/* Condition */}
                <p className={`${getConditionColor(item?.condition)} italic`}>
                    Condition: {item?.condition}
                </p>

                {/* Button */}

            </div>

        </div>
    );
}

export default Course_Card;
