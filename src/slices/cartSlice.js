import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"



const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")) : 0,

    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    loading: false,
    resetart: null,

}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload
            
            const index = state.cart.findIndex((i) => i._id === item._id)

            if (index >= 0) {
                toast.error("Item Already in cart");
                return;
            }

            // if course is in the course then add it to cart  
            state.cart.push(item)
            state.totalItems++;
            state.total += item.price;

            localStorage.setItem("cart", JSON.stringify(state.cart));
            localStorage.setItem("total", JSON.stringify(state.total));
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems));
            toast.success("Item added to the cart..")

            // we may need of backend api to fetch our add  to cart functionality after logout
        },
        removeFromCart: (state, action) => {
            const itemId = action.payload;
            const index = state.cart.findIndex((item) => item._id === itemId)

            if (index >= 0) {
                // If course found in cart, remove it
                const item = state.cart[index];
                state.cart.splice(index, 1);
                state.totalItems--;
                state.total -= item.price;

                // Update local storage
                localStorage.setItem("cart", JSON.stringify(state.cart));
                localStorage.setItem("total", JSON.stringify(state.total));
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems));

                toast.success("Course removed from the cart.")
            } else {
                toast.error("Course not found in cart.")
            }
        },
        setTotalItems(state, value) {
            state.token = value.payload
        },
        setloading(state, value) {
            state.loading = value.payload
        },
    }
})


export const { setTotalItems, setloading, setresetCart ,removeFromCart,addToCart} = cartSlice.actions;
export default cartSlice.reducer;






