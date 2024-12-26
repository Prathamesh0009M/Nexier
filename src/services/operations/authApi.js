import { apiConnector } from "../apiConnector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import setSignupData from "../../slices/authSlice.js";
// import {setloading} from "../../slices/authSlice.js";
import { setToken } from "../../slices/profileSlice.js";

// import { resetCart } from "../../slices/cartSlice";
import { setUser } from "../../slices/profileSlice";
// import { endpoint } from "../api";
import { auhApi } from "../../services/api";
// import {login} from  "../../services/operations/"

const {
    SENDOTP_API,
    SIGNUP_API,
    LOGIN_API,
    RESSPASSTOKEN_API,
    RESETPASSWORD_API,
    SUBMIT_FEEDBACK
} = auhApi;

export function sendOtp(email, navigate) {
    return async (dispatch) => {

        const toastId = toast.loading("Loading...");
        


        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            });


            if (!response.data.success) {
                throw new Error("Something Went Wrong, Try again !");
            }

            toast.success("Kindly Check Your Email");
            navigate("/verify-email");
        } catch (e) {
            console.log("send otp error............!", e);
            toast.error("Could not send OTP");
        }
        // dispatch(setloading(false));
        toast.dismiss(toastId);
    };
}

export function signup(
    accountType, firstName, lastName, email, password, confirmPassword, YearAndBranch, otp, collegeId, navigate
) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        // dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                collegeId,
                YearAndBranch,
                otp,
            });


            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Sign up successfully");
            navigate("/login");
        } catch (e) {
            console.log("sign up api error............!", e);
            toast.error("Sign up failed");
        }
        // dispatch(setloading(false));
        toast.dismiss(toastId);
    };
}
export function login(email, password, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");
        // dispatch(setloading(true));
        try {
            const response = await apiConnector("POST", LOGIN_API, {
                email,
                password,
            });


            if (!response.data.success) {
                throw new Error("Invalid Email or Password");
            }

            toast.success("Login successfully");
            dispatch(setToken(response.data.token));
            const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;

            dispatch(setUser({ ...response.data.user, image: userImage }));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data.user));

            // Reload the page before navigating
            navigate("/");


            // *****************after it remove this *********************************
            window.location.reload();  // Forces the page to reload completely


        } catch (e) {
            console.log("login error............!", e);
            toast.error("Login failed Try Again");
        }
        // dispatch(setloading(false));
        toast.dismiss(toastId);
    };
}

// STATE OF setShowDropdown 
// import { toast } from 'react-toastify'; // Make sure to import toast if you're using it

export function logout(navigate) {
    return (dispatch) => {
        

        // Perform logout operations
        dispatch(setToken(null));
        dispatch(setUser(null));
        // Optional: dispatch(resetCart());

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged Out");

        // Navigate after logout
        navigate("/");
    };
}

export function getPasswordResetToken(email, setEmailSent) {
    return async (dispatch) => {
        // Optionally, you can dispatch a loading state here.
        try {
            // Call the API to send the reset password email
            const toastId = toast.loading("Hold on..")
            const response = await apiConnector("POST", RESSPASSTOKEN_API, { email });


            // Check if the response was successful
            if (!response.data.success) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            // Display a success toast message for the user
            toast.success("Reset email sent successfully! Please check your inbox.");

            // Set the email sent state to true to show any UI feedback
            setEmailSent(true);
        } catch (error) {

            // Show an error toast if the email couldn't be sent
            toast.error("Failed to send reset password email. Please try again.");
        }
        // Optionally, you can dispatch to end the loading state here.
    };
}

export function resetPassword(password, confirmPassword, token) {
    return async (dispatch) => {
        // dispatch(setloading(true));

        try {
            const response = await apiConnector("POST", RESETPASSWORD_API,
                { password, confirmPassword, token }
            );

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Password has been reset succesfully");

        } catch (e) {
            console.log("reset password error............!", e);
            toast.error("Reset password failed!");

        }
        // dispatch(setloading(false));
    }
}

export async function submitFeedback(data) {
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", SUBMIT_FEEDBACK, data
        );

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("form submitted");


    } catch (e) {
        console.log("Submit feedback error ............!", e);
        toast.error("Could not submitted!");
    }

    toast.dismiss(toastId);

}


