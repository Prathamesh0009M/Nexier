import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GiNinjaStar } from "react-icons/gi"
import { MdOutlineDeleteOutline } from "react-icons/md";
import ReactStars from "react-rating-stars-component";
import { removeFromCart } from "../../../../slices/cartSlice" // Import the action
import { Link, useNavigate } from "react-router-dom";
import IconBtn from '../../../common/IconBtn';

const RenderCartItem = () => {
    const { cart } = useSelector((state) => state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to determine the color for the condition
    const getConditionColor = (condition) => {
        if (condition === 'Like New') return 'text-blue-500';
        if (condition === 'Used') return 'text-gray-500';
        return 'text-purple-500';  // Default for other conditions
    };


    return (
        <div>
            {
                cart.map((item, index) => (
                    <div key={index} className="border border-gray-300 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mb-4">
                        {/* Thumbnail and Details */}
                        <div className="flex">
                            <img
                                src={item?.thumbnail}
                                alt="Item Thumbnail"
                                className="w-1/4 rounded-lg object-cover "
                            />

                            <div className="ml-4 space-y-2 w-3/4">
                                {/* Title */}
                                <p className="text-xl font-semibold text-richblack-5">{item?.title}</p>

                                {/* Condition */}
                                <p className={`${getConditionColor(item?.condition)} italic`}>
                                    Condition: {item?.condition}
                                </p>

                                {/* Status and Views */}
                                <div className="flex justify-between items-center">
                                    <p className="text-green-500 font-bold">
                                        Status: {item?.status}
                                    </p>
                                    <p className="text-richblack-5">
                                        Views: {item?.views}
                                    </p>
                                </div>

                                {/* Price */}
                                <p className="text-lg font-bold text-richblack-5">Rs {item?.price}</p>

                                {/* ReactStars for rating (if available) */}
                                {/* <ReactStars
                                    count={5}
                                    value={item?.rating || 0}
                                    size={24}
                                    activeColor="#ffd700"
                                    edit={false}
                                /> */}

                                {/* Button to Remove */}
                                <div className="mt-4 flex justify-between items-center">
                                   
                                    <IconBtn onclick={()=>navigate(`/item/${item._id}/owner/${item.owner._id}`)} text={'View Details'}/>

                                    <button 
                                        onClick={() => dispatch(removeFromCart(item._id))} 
                                        className="flex items-center text-red-500 hover:text-red-700"
                                    >
                                        <MdOutlineDeleteOutline size={24} />
                                        <span className="ml-1">Remove</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartItem;

