import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authApi';
import IconBtn from '../components/common/IconBtn';
import { loginn } from "../asset/Images/loginn.jpg"

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [emailSent, setemailSent] = useState(false);
    const [email, setemail] = useState("");
    const { loading } = useSelector((state) => state.auth);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setemailSent));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-richblack-900 text-white">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="w-full max-w-md p-8 bg-richblack-800 rounded-lg shadow-lg">

                    <div className='flex '>

                        <div> <h1 className="text-2xl font-bold text-center mb-6">
                            {!emailSent ? "Reset your Password" : "Check your Email"}
                        </h1>

                            <p className="text-gray-400 text-center mb-6">
                                {!emailSent ? (
                                    "Don't worry, we'll send you instructions to reset your password. If you don't have access to your email, we can help with account recovery."
                                ) : (
                                    `We have sent a password reset email to ${email}.`
                                )}
                            </p>

                            <form onSubmit={handleOnSubmit} className="space-y-6">
                                {!emailSent && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Email Address
                                        </label>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setemail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full p-4 text-white bg-richblack-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                )}

                                <IconBtn
                                    text={!emailSent ? "Reset Password" : "Resend Email"}
                                    customClasses={'w-full flex item-center justify-center'}
                                />

                                <div className="text-center mt-6">
                                    <Link to="/login" className="text-blue-500 hover:underline">
                                        Back to Login
                                    </Link>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            )}


        </div>
    );
};

export default ForgotPassword;
