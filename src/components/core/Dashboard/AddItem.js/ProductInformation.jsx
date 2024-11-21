import React from 'react'
import { categoryApi } from '../../../../services/api';
import { setStep, setItem } from '../../../../slices/itemSlice';
import { editItemDetails, addItemDetails } from "../../../../services/operations/itemapi"
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { apiConnector } from '../../../../services/apiConnector';
import IconBtn from "../../../common/IconBtn"
import { toast } from "react-hot-toast"


// chaneges for comment  





const ProductInformation = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.auth);
    const { item, editItem,step} = useSelector((state) => state.item);
    const [loading, setLoading] = useState(false);
    const [itemCategories, setItemCategories] = useState([]);

    useEffect(() => {

        const getCategories = async () => {
            // setLoading(true);
            try {
                const response = await apiConnector("GET", categoryApi.GET_ALL_CATEGORY_API);
                if (response.data.success) {
                    setItemCategories(response.data.data);
                }
            } catch (e) {
                console.log("could not fetch category list", e);
            } finally {
                // setLoading(false);
            }
        };

        if (editItem && item) { // Check if item exists
            setValue("itemTitle", item?.title || ""); // Use default value or empty string if item.title is null
            setValue("itemShortDesc", item?.description || "");
            setValue("price", item?.price || 0);
            setValue("itemCategory", item?.category || "");
            setValue("status", item?.status || "");
            setValue("thumbnailI", item?.thumbnail || "");
            setValue("location", item?.location || "");  // Check location
            setValue("rentalAvailable", item?.rentalAvailable || "");  // Check rental availability
            setValue("rentalPrice", item?.rentalPrice || "");  // Check rental price
            setValue("rentalDuration", item?.rentalDuration || "");  // Check rental duration
        }

       
        getCategories();

    }, [editItem, item, setValue]);

    const isFormUpdated = () => {
        const currentValues = getValues();

        if (currentValues.itemTitle !== item.title ||
            currentValues.itemShortDesc !== item.description ||
            currentValues.price !== item.price ||
            currentValues.itemCategory !== item.category ||
            currentValues.status !== item.status ||
            currentValues.thumbnailI !== item.thumbnail ||
            currentValues.location !== item.location ||  // Check location
            currentValues.rentalAvailable !== item.rentalAvailable ||  // Check rental availability
            currentValues.rentalPrice !== item.rentalPrice ||  // Check rental price
            currentValues.rentalDuration !== item.rentalDuration  // Check rental duration
        ) {
            return true;
        } else {
            return false;
        }
    };

    // handle next button
    const onSubmit = async (data) => {
        if (editItem) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();

                formData.append("itemId", item._id);
                if (currentValues.itemTitle !== item.title) {
                    formData.append("title", data.itemTitle);
                }
                if (currentValues.itemShortDesc !== item.description) {
                    formData.append("description", data.itemShortDesc);
                }
                if (currentValues.price !== item.price) {
                    formData.append("price", data.price);
                }
                if (currentValues.itemCategory._id !== item.category._id) {
                    formData.append("category", data.itemCategory);
                }
                if (currentValues.status._id !== item.status) {
                    formData.append("status", data.status);
                }

                // New fields
                if (currentValues.location !== item.location) {
                    formData.append("location", data.location);
                }
                if (currentValues.thumbnailI !== item.thumbnail) {
                    formData.append("location", data.location);
                }
                if (currentValues.rentalAvailable !== item.rentalAvailable) {
                    formData.append("rentalAvailable", data.rentalAvailable);
                }
                if (currentValues.rentalPrice !== item.rentalPrice) {
                    formData.append("rentalPrice", data.rentalPrice);
                }
                if (currentValues.rentalDuration !== item.rentalDuration) {
                    formData.append("rentalDuration", data.rentalDuration);
                }

                setLoading(true);
                const result = editItemDetails(formData, token);
                setLoading(false);

                if (result) {
                    dispatch(setStep(2));
                    
                    dispatch(setItem(result));
                }
            } else {
                toast.error("No changes made so far");
            }
            return;
        }

        // else create new Product
        const formData = new FormData();
        formData.append("title", data.itemTitle);
        formData.append("description", data.itemShortDesc);
        formData.append("price", data.price);
        formData.append("category", data.itemCategory);
        formData.append("condition", data.condition);
        formData.append("status", data.status);
        formData.append("thumbnailI", data.thumbnailI[0]);
        formData.append("location", data.location);  // New field
        formData.append("rentalAvailable", data.rentalAvailable);  // New field
        if (data.rentalAvailable === "Available") {
            formData.append("rentalPrice", data.rentalPrice);  // New field
            formData.append("rentalDuration", data.rentalDuration);  // New field
        }

        setLoading(true);
        const result = await addItemDetails(formData, token);

        if (result) {
            dispatch(setStep(2));
            dispatch(setItem(result));
        }
        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}
    className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8' >
    
    {/* Product Name Input */}
    <div>
        <label htmlFor="itemTitle" className="text-sm font-semibold">Product Name<sup className='text-red-600'>*</sup></label>
        <input
            id='itemTitle'
            placeholder='Enter Product Title'
            {...register("itemTitle", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        />
        {errors.itemTitle && (
            <span className="text-red-500 text-xs">Item Title is required</span>
        )}
    </div>

    {/* Short Description Input */}
    <div>
        <label htmlFor="itemShortDesc" className="text-sm font-semibold">Product Short Description<sup className='text-red-600'>*</sup></label>
        <textarea
            id='itemShortDesc'
            placeholder='Enter Product Description'
            {...register("itemShortDesc", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        />
        {errors.itemShortDesc && (
            <span className="text-red-500 text-xs">Item Description is required</span>
        )}
    </div>

    {/* Price Input */}
    <div>
        <label htmlFor="price" className="text-sm font-semibold">Price<sup className='text-red-600'>*</sup></label>
        <div className='relative'>
            <HiOutlineCurrencyRupee className="absolute top-3 left-3 text-gray-400" />
            <input
                id='price'
                type='number'
                placeholder='Enter Product Price'
                {...register("price", { required: true })}
                className='w-full pl-10 pr-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
            />
        </div>
        {errors.price && (
            <span className="text-red-500 text-xs">Item Price is required</span>
        )}
    </div>

    {/* Category Select */}
    <div>
        <label htmlFor='itemCategory' className="text-sm font-semibold">Product Category <sup className='text-red-600'>*</sup></label>
        <select
            id='itemCategory'
            defaultValue={""}
            {...register("itemCategory", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        >
            <option value="" disabled>Choose a Category</option>
            {!loading && itemCategories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
        </select>
        {errors.itemCategory && (
            <span className="text-red-500 text-xs">Item Category is required</span>
        )}
    </div>

    {/* Product Status Select */}
    <div>
        <label htmlFor='status' className="text-sm font-semibold">Product Current Status <sup className='text-red-600'>*</sup></label>
        <select
            id='status'
            defaultValue={""}
            {...register("status", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        >
            <option value="" disabled>Choose Status</option>
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            <option value="Sold">Sold</option>
        </select>
        {errors.status && (
            <span className="text-red-500 text-xs">Item Status is required</span>
        )}
    </div>

            
    {/* Product Image Input */}
    <div>
        <label className="text-sm font-semibold">Product Image <sup className='text-red-600'>*</sup></label>
        <input
            type="file"
            id="thumbnailI"
            {...register("thumbnailI", { required: !editItem })}
            accept="image/*"
            className='w-full mt-2 px-4 py-2 bg-richblack-900 border border-richblack-600 rounded-md text-white cursor-pointer focus:outline-none'
        />
        {errors.thumbnailI && (<span className="text-red-500 text-xs">Product Image is required</span>)}
    </div>

    {/* Location Input */}
    {/* <div>
        <label htmlFor="location" className="text-sm font-semibold">Location<sup className='text-red-600'>*</sup></label>
        <input
            id='location'
            placeholder='Enter Item Location'
            {...register("location", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        />
        {errors.location && (
            <span className="text-red-500 text-xs">Location is required</span>
        )}
    </div> */}
            
            <div>
        <label htmlFor='condition' className="text-sm font-semibold">Product Current Condition <sup className='text-red-600'>*</sup></label>
        <select
            id='condition'
            defaultValue={""}
            {...register("condition", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        >
            <option value="" disabled>Select</option>
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
        </select>
        {errors.condition && (
            <span className="text-red-500 text-xs">Item condition is required</span>
        )}
    </div>

    {/* Rental Availability */}
    <div>
        <label htmlFor='rentalAvailable' className="text-sm font-semibold">Rental Availability<sup className='text-red-600'>*</sup></label>
        <select
            id='rentalAvailable'
            defaultValue={""}
            {...register("rentalAvailable", { required: true })}
            className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
        >
            <option value="" disabled>Select Rental Availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
        </select>
        {errors.rentalAvailable && (
            <span className="text-red-500 text-xs">Rental Availability is required</span>
        )}
    </div>

    {/* Rental Price & Duration Fields */}
    {/* {getValues("rentalAvailable") === "Available" && ( */}
        <>
            <div>
                <label htmlFor="rentalPrice" className="text-sm font-semibold">Rental Price<sup className='text-red-600'>*</sup></label>
                <input
                    id='rentalPrice'
                    placeholder='Enter Rental Price'
                    {...register("rentalPrice")}
                    className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
                />
{/*                 {errors.rentalPrice && (
                    <span className="text-red-500 text-xs">Rental Price is required</span>
                )} */}
            </div>

            <div>
                <label htmlFor="rentalDuration" className="text-sm font-semibold">Rental Duration<sup className='text-red-600'>*</sup></label>
                <input
                    id='rentalDuration'
                    placeholder='Enter Rental Duration'
                    {...register("rentalDuration")}
                    className='w-full px-4 py-2 mt-2 border border-richblack-600 rounded-md bg-richblack-900 text-white focus:outline-none focus:border-yellow-500 transition-all duration-200 ease-in-out'
                />
{/*                 {errors.rentalDuration && (
                    <span className="text-red-500 text-xs">Rental Duration is required</span>
                )} */}
            </div>
        </>
    {/* )} */}

    {/* Submit Button */}
    <div>
        <IconBtn
            text={!editItem ? "Next" : "Save Changes"}
        />
    </div>
</form>

    );
};

export default ProductInformation;
