const BASE_URL = process.env.REACT_APP_BASE_URL


export const itemApi = {

    CREATE_ITEM_API:BASE_URL+"/item/createProduct",
    EDIT_ITEM_API:BASE_URL+"/item/editItemDetails",
    STATUS_CHANGE_API:BASE_URL+"/item/StatusChange",
    DELETE_PRODUCT_API:BASE_URL+"/item/deleteItem",
    GET_ALL_ITEMS_API:BASE_URL+"/item/getAllProduct",
    GET_ITEMS_Details_API: BASE_URL + "/item/getProductDetails",
    ADD_VIEWS: BASE_URL + "/item/views",
    GET_MESSAGE_DATA: BASE_URL + "/profile/messageHistory",
    GET_OWNER_PRODUCTS:BASE_URL+"/item/ownersAllProduct",
        CONTACT_SELLER_API:BASE_URL+"/item/contactSeller",

    
}
export const categoryApi = {
    GET_ALL_CATEGORY_API:BASE_URL+"/item/showAllCategory",
    ADD_CATEGORY:BASE_URL+"/item/createCategory"

}

// need to recheck path 
export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/item/getCategoryPageDetails",
};

export const searchApi = {
    ADVANCE_SEARCH:BASE_URL+"/item/advanceSearch"
}


export const auhApi = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESSPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
    SUBMIT_FEEDBACK:BASE_URL+"/auth/submit-feedback",


    // getAllUserDetails
    USER_ALL_DATA:BASE_URL+"/profile/getAllUserDetails",
    FRIEND_DATA:BASE_URL+"/profile/getFriendAllData"
}

export const profileApi = {
    UPDATE_DP_API: BASE_URL + "/profile/updateDP",
    DELETE_API: BASE_URL + "/profile/deleteAccount",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
    FOLLOW_FIRST:BASE_URL+"/profile/following",
    FOLLOWER_LIST:BASE_URL+"/profile/followerList",
    FRIEND_RECOMONDATION: BASE_URL + "/profile/friendRecommended",
    GET_RANDOM_USER: BASE_URL + "/profile/getRandomUser",
    
}



// academics 
export const academicApi = {
    ADD_PYQ:BASE_URL+"/profile/addPyq",
    FIND_PAPER:BASE_URL+"/profile/findPapers",
}










