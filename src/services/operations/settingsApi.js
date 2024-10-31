

import { apiConnector } from "../apiConnector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { profileApi } from "../../services/api";


export function update_Dp(thumbnailImage, token) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        const formData = new FormData();
        formData.append('thumbnailImage', thumbnailImage); // Ensure the key matches what the backend expects

        try {
            const response = await apiConnector("POST", profileApi.UPDATE_DP_API, formData, {
                "Authorization": `Bearer ${token}`,
            });

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            toast.success("Profile picture updated successfully");
            const updatedUser = {
                ...JSON.parse(localStorage.getItem("user")),
                image: response.data.data, // Ensure this matches the structure of the response
            };

            localStorage.setItem("user", JSON.stringify(updatedUser));


        } catch (e) {
            console.log("profile picture update............!", e);
            toast.error("Could not update profile picture");
        }
        toast.dismiss(toastId);
    };
}



export async function updateProfileInfo(data, token) {
    let result = null;

    const toastId = toast.loading("Loading...");


    try {
        const response = await apiConnector("POST", profileApi.UPDATE_PROFILE_API, data, {
            "Authorization": `Bearer ${token}`,
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Profile information updated successfully");
        const updatedUser = {
            ...JSON.parse(localStorage.getItem("user")),
            ...response.data.data // Ensure this matches the structure of the response
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));
        result = response?.data?.data;
    } catch (e) {
        console.log("Error updating profile information:", e.message);
        toast.error("Could not update profile information");
    }
    toast.dismiss(toastId);
    return result;
}


// delete function is done now just navigate at home page  and send pop up to user
export function Delete_Account(id, token, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...");

        try {
            // console.log("i am here ", token)

            // const response = await apiConnector("DELETE", DELETE_API, null, {
            //     "Authorization": `Bearer ${token}`,
            // });

            const response = await apiConnector("DELETE", profileApi.DELETE_API, { id }, {
                "Authorization": `Bearer ${token}`,
            });

            // console.log("i am here ")

            if (!response.data.success) {
                throw new Error(response.data.message);
            }

            navigate("/");
            toast.success("Account Deleted successfully");
            localStorage.removeItem("user");
            

        } catch (e) {
            console.log("Error delete account:", e.message);
            toast.error("Could not delete account");
        }
        toast.dismiss(toastId);
    };
}