import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  orderList: [],
  orderDetails: null,
  isLoading: false,
  error: null,
};

export const getAllOrdersForAdmin = createAsyncThunk(
  "order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_UR}/api/admin/orders/get`
    );
    return response.data;
  }
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_UR}/api/admin/orders/details/${id}`
    );
    return response.data;
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_UR}/api/admin/orders/update/${id}`,
      { orderStatus }
    );
    return response.data;
  }
);

const adminOrderSlice = createSlice({
  name: "adminOrder",
  initialState,
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all orders
      .addCase(getAllOrdersForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrdersForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        // fallback for response format
        state.orderList = action.payload.data ?? action.payload ?? [];
      })
      .addCase(getAllOrdersForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.orderList = [];
      })

      // get order details
      .addCase(getOrderDetailsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getOrderDetailsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data ?? action.payload ?? null;
      })
      .addCase(getOrderDetailsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
        state.orderDetails = null;
      })

      // update order status (optional loading state here)
      .addCase(updateOrderStatus.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
