import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OTPInput from "react-otp-input";
import { useNavigate, Link } from 'react-router-dom';
import { sendOtp, signup } from '../services/operations/authApi';
import IconBtn from '../components/common/IconBtn';

const VerifyEmail = () => {
    const { signUpData, loading } = useSelector((state) => state.auth);
    const [otp, setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (!signUpData) {
            navigate("/signup");
        }
    }, [signUpData, navigate]);

    const {
        accountType,
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        collegeId,
        YearAndBranch
    } = signUpData;

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword,YearAndBranch, otp, collegeId, navigate));
    }

    return (
        <div className='bg-richblack-900 min-h-screen flex items-center justify-center p-5'>
            {loading ? (
                <div className="text-center text-lg text-white">Loading...</div>
            ) : (
                <div className="bg-richblack-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <h1 className="text-2xl font-semibold text-white mb-4">Verify Your Email</h1>
                    <p className="text-gray-400 mb-6">A verification code has been sent to your email. Enter the code below:</p>
                    <form onSubmit={handleOnSubmit} className="flex flex-col">
                        <div className="flex justify-between ml-32 mb-4">
                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={4}
                                renderSeparator={<span className="text-white">-</span>}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        className="bg-richblack-700 border border-richblack-600 text-white rounded-md w-12 h-12 text-center placeholder-richblack-400 focus:outline-none focus:ring-2 focus:ring-yellow-200 transition-all duration-200 transform hover:scale-105"
                                        placeholder="0"
                                        maxLength={1}
                                    />
                                )}
                            />
                        </div>


                        <IconBtn
                            text={'Verify Email'}
                                type={'submit'}
                                customClasses={'w-full flex item-center justify-center'}
                        />
                    </form>

                    <div className="mt-4 text-center">
                        <Link to="/login">
                            <p className="text-gray-400 hover:text-white transition duration-200">Back to Login</p>
                        </Link>
                        <button
                            onClick={() => dispatch(sendOtp(signUpData.email, navigate))}
                            className="mt-2 text-blue-600 hover:text-blue-500 transition duration-200"
                        >
                            Resend it
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-richblack-5 text-center">
    <span className="text-yellow-300 font-semibold">Can't find your OTP?</span> 
    Check your <span className="text-blue-500">Spam folder</span> or look in <span className="text-blue-500">All Inboxes</span>.
</p>

                </div>
            )}
        </div>
    );
}

export default VerifyEmail;
