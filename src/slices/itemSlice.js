import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    step: 1,
    item: null,
    editItem: false,
    paymentLoading: false,
    itemAllData: [],
};

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        setStep: (state, action) => {
            state.step = action.payload;
        },

        setItem: (state, action) => {
            state.item = action.payload;
        },
        setItemAllData: (state, action) => {
            state.itemAllData = action.payload;
        },

        setEditItem: (state, action) => {
            state.editItem = action.payload;
        },

        setPaymentLoading: (state, action) => {
            state.paymentLoading = action.payload;
        },
        resetItemState: (state) => {
            state.step = 1;
            state.item = null;
            state.editCourse = false;
        },

    },
});

export const {

    setItem, setStep, setEditItem, setPaymentLoading, resetItemState,setItemAllData,
} = itemSlice.actions;

export default itemSlice.reducer;









