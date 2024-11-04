import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from "../services/operations/authApi";
import { setSignupData } from '../slices/authSlice.js';
import { IoEye, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import IconBtn from '../components/common/IconBtn.jsx';
import signup from "../asset/Images/signup.jpg"

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signUpData } = useSelector((state) => state.auth);
    const loading = useSelector((state) => state.auth.loading);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: "",
        contactNumber: "",
        collegeId: "",
        commonChatId: "yaha Id AAyegi common conversation ki",
        YearAndBranch: "",
    });

    const handleOnChange = e => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const signupDetails = { ...formData };  // Only serializable data
        dispatch(setSignupData(signupDetails));  // Dispatch signup data
        dispatch(sendOtp(formData.email, navigate));  // Navigate handled separately
    };

    return (
        <div className="flex flex-col-reverse md:flex-row h-screen mt-12">


            <div className="flex-1 flex justify-center items-center bg-richblack-900 p-6">
                <div className="w-full max-w-md">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className='text-white'>
                            <h2 className='text-2xl font-bold mb-6'>Create Your Account</h2>
                            <form onSubmit={handleOnSubmit} className="space-y-4">
                                <div className="flex flex-col">
                                    <label>
                                        <p>First Name</p>
                                        <input
                                            required
                                            type="text"
                                            name='firstName'
                                            value={formData.firstName}
                                            onChange={handleOnChange}
                                            className='w-full h-4 p-4 bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>
                                    <label>
                                        <p>Last Name</p>
                                        <input
                                            required
                                            type="text"
                                            name='lastName'
                                            value={formData.lastName}
                                            onChange={handleOnChange}
                                            className='w-full h-4 p-4 bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>
                                    <label>
                                        <p>Email</p>
                                        <input
                                            required
                                            type="email"
                                            name='email'
                                            value={formData.email}
                                            onChange={handleOnChange}
                                            className='w-full  h-4 p-4 bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>
                                </div>

                                {/* Flex container for smaller fields */}
                                <div className="flex flex-wrap gap-4">
                                    <label className="flex-1 min-w-[150px]">
                                        <p>Intrested In:</p>
                                        <input
                                            required
                                            type="text"
                                            name='accountType'
                                            value={formData.accountType}
                                            onChange={handleOnChange}
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>
                                    <label className="flex-1 min-w-[150px]">
                                        <p>Contact Number <span><sup className='text-red-700'>*</sup></span></p>
                                        <input
                                            required
                                            type="text"
                                            name='contactNumber'
                                            value={formData.contactNumber}
                                            onChange={handleOnChange}
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>


                                </div>
                                <div className='flex flex-wrap gap-4'>
                                    <label className="flex-1 min-w-[150px]">

                                        <p>PRN NO:  <span><sup className='text-red-700'>*</sup></span> </p>
                                        <input
                                            required
                                            type="text"
                                            name='collegeId'
                                            value={formData.collegeId}
                                            onChange={handleOnChange}
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                        </label>
                                        
                                    <label className="flex-1 min-w-[150px]">

                                        <p>Year And Branch <span><sup className='text-red-700'>*</sup></span> </p>
                                        <input
                                            required
                                            type="text"
                                            name='YearAndBranch'
                                            value={formData.YearAndBranch}
                                            onChange={handleOnChange}
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                    </label>

                                </div>

                                <div className="flex flex-wrap gap-4">
                                    <label className="flex-1 min-w-[150px]">
                                        <p>Password <span><sup className='text-red-700'>*</sup></span></p>
                                        <input
                                            required
                                            type={showPassword ? "text" : "password"}
                                            name='password'
                                            value={formData.password}
                                            onChange={handleOnChange}
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                        <span onClick={() => setShowPassword(prev => !prev)} className="cursor-pointer">
                                            {showPassword ? <IoEye fontSize={24} /> : <IoEyeOffOutline fontSize={24} />}
                                        </span>
                                    </label>
                                    <label className="flex-1 min-w-[150px]">
                                        <p>Confirm Password <span><sup className='text-red-700'>*</sup></span></p>
                                        <input
                                            required
                                            type={showConfirmPassword ? "text" : "password"}
                                            name='confirmPassword'
                                            value={formData.confirmPassword}
                                            onChange={handleOnChange}
                                            placeholder='Confirm New Password'
                                            className='w-full p-4 h-4  bg-richblack-600 text-richblack-5 rounded'
                                        />
                                        <span onClick={() => setShowConfirmPassword(prev => !prev)} className="cursor-pointer">
                                            {showConfirmPassword ? <IoEye fontSize={24} /> : <IoEyeOffOutline fontSize={24} />}
                                        </span>
                                    </label>
                                </div>


                                <IconBtn type={"submit"} text={'Create Account'} customClasses={'w-full flex item-center justify-center'} />
                            </form>
                        </div>
                    )}
                </div>
            </div>

            <div className="md:flex md:w-1/2 bg-richblack-900 justify-center items-center">
                {/* Image with colorful border */}
                <div className="p-1 rounded-md">
                    <img
                        src={signup}
                        alt="Signup"
                        className="rounded-md border-4 border-gradient-to-r from-red-500 to-blue-500 p-1 object-cover ml-10 h-[300px] md:h-[450px]"
                    />
                </div>
            </div>

        </div>
    );
};

export default Signup;
