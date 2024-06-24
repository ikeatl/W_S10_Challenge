import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orders: [],
    filterSize: 'All',
    fullName: '',
    size: '',
    toppings: [],
}

const orderListSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        setFullName(state, action) {
            state.fullName = action.payload;
        },
        setSize(state, action) {
            state.size = action.payload;
        },
        addTopping(state, action) {
            state.toppings.push(action.payload);
        },
        removeTopping(state, action) {
            state.toppings = state.toppings.filter(topping => topping !== action.payload);
        },
        resetOrder(state) {
            state.fullName = '';
            state.size = '';
            state.toppings = [];
        },
        setFilterSize(state, action) {
            state.filterSize = action.payload;
        }
    }
})
export const {
    setFullName,
    setSize,
    addTopping,
    removeTopping,
    resetOrder,
    setFilterSize
} = orderListSlice.actions;

export default orderListSlice.reducer