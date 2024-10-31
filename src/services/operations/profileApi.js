
import { apiConnector } from "../apiConnector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { auhApi } from "../../services/api";
import { profileApi,academicApi } from "../../services/api";
import { logout } from "../operations/authApi"

export async function getUserAllData(token,navigate) {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        // Call API with Authorization header
        const response = await apiConnector("GET", auhApi.USER_ALL_DATA, null, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("All user data:", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data;

    } catch (e) {
        console.log("Error fetching user data:", e);

        // Check if error is 401 (Unauthorized) due to token issues
        if (e.response && e.response.status === 401) {
            toast.error("Session expired. Please log in again.");
            logout(navigate); // Call logout to handle expired token
        } else {
            toast.error("Failed to fetch user data!");
        }
    }

    // Dismiss loading toast
    toast.dismiss(toastId);

    return result;
}


export async function getFriendAllData(data,token) {
    let result = null;
    const toastId = toast.loading("Loading...");
    const formData = new FormData();
    formData.append("id", data);
    try {
        // change at api front 
        const response = await apiConnector("POST", auhApi.FRIEND_DATA, formData, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("All user data ...........", response);

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        result = response?.data.data;

    } catch (e) {
        console.log("user data error............!", e);
        toast.error("failed to bring data !");
    }
    // dispatch(setloading(false));
    toast.dismiss(toastId);

    return result;
}

export const followFriend = async (data, token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    const formData = new FormData();
    formData.append("friendId",data)

    try {
        const response = await apiConnector("POST", profileApi.FOLLOW_FIRST, formData, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("following response", response);
        if (!response?.data?.success) {
            throw new Error("could not follow friend");
        }

        toast.success("you followed..!");
        result = response?.data;
    } catch (error) {
        console.log("following error", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const followerData = async ( token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    // const formData = new FormData();
    // formData.append("friendId",data)

    try {
        const response = await apiConnector("GET", profileApi.FOLLOWER_LIST, null, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("following response", response);
        if (!response?.data?.success) {
            throw new Error("could not follow friend");
        }

        // toast.success("you followed..!");
        result = response?.data;
    } catch (error) {
        console.log("following error", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};


export const friendrecommandation = async (data, token) => {
    
    let result = null;
    // const toastId = toast.loading("Loading...");

    const formData = new FormData();
    formData.append("userId",data)

    try {
        const response = await apiConnector("POST", profileApi.FRIEND_RECOMONDATION, formData, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("following response", response);
        if (!response?.data?.success) {
            throw new Error("could not find recommandation friend");
        }

        // toast.success("you followed..!");
        result = response?.data?.data;
    } catch (error) {
        console.log("recommandation error", error);
        toast.error(error.message);
    }

    // toast.dismiss(toastId);
    return result;
};

export const randomUser = async (data, token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    const formData = new FormData();
    formData.append("userId",data)

    try {
        const response = await apiConnector("POST", profileApi.GET_RANDOM_USER, formData, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("random user response", response);
        if (!response?.data?.success) {
            throw new Error("E following");
        }

        // toast.success("Data fetched..!");
        result = response?.data?.data;
    } catch (error) {
        console.log("random User error", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const AddQuetionPaper = async (data, token,navigate) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    const formData = new FormData();

    try {
        const response = await apiConnector("POST", academicApi.ADD_PYQ, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        // console.log("Add item response", response);
        if (!response?.data?.success) {
            throw new Error("Could not add pyq");
        }

        toast.success("PYQ Added")
        navigate("/dashboard/Academics")
        // toast.success("Data fetched..!");
        result = response?.data;
    } catch (error) {
        console.log("add pyq error", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const findQuetionPaper = async (data, token) => {
    
    let result = null;
    const toastId = toast.loading("Loading...");

    const formData = new FormData();

    try {
        const response = await apiConnector("POST", academicApi.FIND_PAPER, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        });

        // console.log("Find item response", response);
        if (!response?.data?.success) {
            throw new Error("Could not add pyq");
        }

        // toast.success("Data fetched..!");
        result = response?.data?.data;
    } catch (error) {
        console.log("add pyq error", error);
        toast.error("No Paper Found");
    }

    toast.dismiss(toastId);
    return result;
};





