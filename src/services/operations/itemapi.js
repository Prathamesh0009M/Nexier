import { itemApi,categoryApi } from "../api"
import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
const { GET_ALL_ITEMS_API,
    GET_ITEMS_Details_API,
    ADD_VIEWS,
    GET_MESSAGE_DATA,
    CREATE_ITEM_API,
    GET_OWNER_PRODUCTS,
    EDIT_ITEM_API,
    DELETE_PRODUCT_API,
    STATUS_CHANGE_API,
  
} = itemApi;


export const fetchAllItems = async () => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("GET", GET_ALL_ITEMS_API, null);

        if (!response?.data?.success) {
            throw new Error("Could not fetch All Items");
        }

        // toast.success("Items fetched successfully");
        result = response.data.data;
    } catch (error) {
        console.error("FETCH item ERROR", error);
        toast.error(error.message);
    }
    
    toast.dismiss(toastId);
    return result;
}


export const fetchItemData = async (data) => {

    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("POST", GET_ITEMS_Details_API, data);

        if (!response?.data?.success) {
            throw new Error("Could not fetch All Items");
        }

        
        result = response.data;
       

    } catch (error) {
        console.error("FETCH single  item ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}


export const ownersAllProduct = async (token) => {
    let result = null;
    const toastId = toast.loading("Loading...");

    try {
        const response = await apiConnector("GET", GET_OWNER_PRODUCTS, null, {
            Authorization: `Bearer ${token}`,
        });

        if (!response?.data?.success) {
            throw new Error("Could not fetch owner all product ");
        }

        result = response.data.data;
    } catch (error) {
        console.error("FETCH owner all ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
};

export const view = async (data) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", ADD_VIEWS, data);
        // console.log("VIEW SECTION API RESPONSE... ", response);
        // console.log("i AM HERE ")

        if (!response?.data?.success) {
            throw new Error("Could not view All Items");
        }

        // toast.success("Items viewed successfully");
        result = response.data;
    } catch (error) {
        console.error("view  item ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const getMessageData = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", GET_MESSAGE_DATA, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ")

        if (!response?.data?.success) {
            throw new Error("Could not find all message");
        }

        // toast.success("Items viewed successfully");
        result = response.data.data;
    } catch (error) {
        console.error("fetch all message ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

// editItemDetails, addItemDetails




export const addItemDetails = async (data, token) => {

    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnector("POST", CREATE_ITEM_API, data, {
            Authorization: `Bearer ${token}`,
        });

        // console.log("i AM HERE ")

        if (!response?.data?.success) {
            throw new Error("Could not make product");
        }

        // toast.success("Items viewed successfully");
        result = response.data;
    } catch (error) {
        console.error("product create successfully ERROR", error);
        toast.error(error.message);
    }

    toast.dismiss(toastId);
    return result;
}

export const editItemDetails = async (data, token) => {
    
        let result = null;
        const toastId = toast.loading("Loading...");
    
        try {
            const response = await apiConnector("POST", EDIT_ITEM_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
    
            if (!response?.data?.success) {
                throw new Error("Could not Update Course Details");
            }
    
            result = response?.data;
        } catch (error) {
            console.log("EDIT COURSE API ERROR", error);
            toast.error(error.message);
        }
    
        toast.dismiss(toastId);
        return result;
    };

export const StatusChange= async (data, token) => {
    
        let result = null;
        const toastId = toast.loading("Loading...");
    
        try {
            const response = await apiConnector("POST", STATUS_CHANGE_API, data, {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            });
    
            if (!response?.data?.success) {
                throw new Error("Could not Update Course Details");
            }
    
            toast.success("Course Details Updated Successfully");
            result = response?.data;
        } catch (error) {
            console.log("EDIT COURSE API ERROR", error);
            toast.error(error.message);
        }
    
        toast.dismiss(toastId);
        return result;
    };


export const deleteItem = async (data, token) => {
    
        let result = null;
        const toastId = toast.loading("Loading...");
    
        try {
            const response = await apiConnector("POST", DELETE_PRODUCT_API, data, {
                "Content-Type": "multipart/form-data",  
                Authorization: `Bearer ${token}`,
            });
    
            if (!response?.data?.success) {
                throw new Error("Could not delete item");
            }
    
            toast.success("Product Deleted Successfully..!");
            result = response?.data;
        } catch (error) {
            console.log("ITEM DELETE API ERROR", error);
            toast.error(error.message);
        }
    
        toast.dismiss(toastId);
        return result;
    };


export const addCategory = async (data, token) => {
    
        let result = null;
        const toastId = toast.loading("Loading...");
    
  
        try {
            const response = await apiConnector("POST", categoryApi.ADD_CATEGORY, data, {
                "Content-Type": "multipart/form-data",  
                Authorization: `Bearer ${token}`,
            });
    
            if (!response?.data?.success) {
                throw new Error("Could not make category");
            }
    
            toast.success("category created Successfully..!");
            result = response?.data;
        } catch (error) {
            console.log("ITEM category API ERROR", error);
            toast.error(error.message);
        }
    
        toast.dismiss(toastId);
        return result;
    };











