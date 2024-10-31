
import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiConnector';
import { searchApi } from "../api"
import { catalogData } from "../api"
const { ADVANCE_SEARCH } = searchApi;
const { CATALOGPAGEDATA_API } = catalogData;



export const getCatalogPageData = async (categoryId) => {
    let result = []
    const toastId = toast.loading("Loading...");
    try {

        const response = await apiConnector("POST", CATALOGPAGEDATA_API, { categoryId: categoryId });

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Category page data")   
        }

         result = response?.data;
        
    } catch (error) {
        console.log("CATALOG PAGE DATA API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
        
    }
    toast.dismiss(toastId)
    return result;

}

export const advanceSearch = async (searchQuery) => {

    const formData = new FormData();
    formData.append("keyword", searchQuery);

    let result = []
    const toastId = toast.loading("Loading...");
    try {

        const response = await apiConnector("POST", ADVANCE_SEARCH,formData,null);

        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Category page data")   
        }

      
         result = response?.data;
        
    } catch (error) {
        console.log("ADVANCE SEARCH API ERROR....", error);
        toast.error(error.message);
        result = error.response?.data;
        
    }
    toast.dismiss(toastId)
    return result;

}


