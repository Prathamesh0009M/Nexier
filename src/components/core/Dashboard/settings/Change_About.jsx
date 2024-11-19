import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setUser } from '../../../../slices/profileSlice';
import { updateProfileInfo } from '../../../../services/operations/settingsApi';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../../../common/IconBtn';

const Change_About = () => {
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // const { user } = useSelector((state) => state.profile);
    // console.log("gggggggggggg0", user);

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm();

    const submitForm = async (data) => {
        // console.log("Data is ",data)
        setLoading(true);
        const userData = await updateProfileInfo(data, token);
        
        dispatch(setUser(userData));
        navigate('/dashboard/my-profile')


        
        setLoading(false);
    };

    useEffect(() => {
        reset({
            firstName: "",
            lastName: "",
            dateOfBirth: "",
            gender: "",
            contactNumber: "",
            about: "",
            intrestedIn:"",
            collegeId:"",
        });
    }, [reset, isSubmitSuccessful]);

    return (
        <div className="bg-richblack-800 border border-richblack-700 rounded-lg p-6 space-y-4">
            <h2 className="text-xl text-richblack-5 font-semibold mb-4">Profile Information</h2>
            <form onSubmit={handleSubmit(submitForm)} className="space-y-4">
                <div>
                    <label htmlFor='firstName' className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("firstName", { required: "First name is required" })}
                    />
                    {errors.firstName && <span className="text-red-500 text-xs">{errors.firstName.message}</span>}
                </div>
                <div>
                    <label htmlFor='lastName' className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("lastName")}
                    />
                    {errors.lastName && <span className="text-red-500 text-xs">{errors.lastName.message}</span>}
                </div>
                <div>
                    <label htmlFor='contactNumber' className="block mb-2 text-sm font-medium text-gray-300">Contact Number</label>
                    <input
                        type="text"
                        id="contactNumber"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("contactNumber")}
                    />
                </div>
                <div>
                    <label htmlFor='dateOfBirth' className="block mb-2 text-sm font-medium text-gray-300">Date of Birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("dateOfBirth")}
                    />
                </div>
                <div>
                    <label htmlFor='intrestedIn' className="block mb-2 text-sm font-medium text-gray-300">Intrested In</label>
                    <input
                        type="text"
                        id="intrestedIn"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("intrestedIn")}
                    />
                </div>
                <div>
                    <label htmlFor='collegeId' className="block mb-2 text-sm font-medium text-gray-300">PRN NO.</label>
                    <input
                        type="text"
                        id="collegeId"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("collegeId")}
                    />
                </div>

                <div>
                    <label htmlFor='gender' className="block mb-2 text-sm font-medium text-gray-300">Gender</label>
                    <select
                        id="gender"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        {...register("gender")}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label htmlFor='about' className="block mb-2 text-sm font-medium text-gray-300">About</label>
                    <textarea
                        id="about"
                        className="w-full p-2 rounded-md bg-gray-700 text-white"
                        rows="4"
                        {...register("about")}
                    />
                </div>
              
                <IconBtn 
                    text={loading ? "Submitting..." : "Update Profile"}
                    customClasses={'w-full flex item-center justify-center'}
                />
            </form>
        </div>
    )
}

export default Change_About;
