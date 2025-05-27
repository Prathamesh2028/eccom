import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  featureImageList: [
    "/assets/banner-1.webp",
    "/assets/banner-2.webp",
    "/assets/banner-3.webp",
  ], // ✅ Ensures initial images
};

export const getFeatureImages = createAsyncThunk(
  "/order/getFeatureImages",
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_UR}/api/common/feature/get`
    );
    return response.data;
  }
);

export const addFeatureImage = createAsyncThunk(
  "/order/addFeatureImage",
  async (image) => {
    const response = await axios.post(
      `${import.meta.env.VITE_UR}/api/common/feature/add`,
      { image }
    );

    return response.data;
  }
);

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;

        // ✅ Filter out invalid entries (null, empty strings)
        const validImages = action.payload.data.filter(
          (img) => typeof img === "string" && img.trim() !== ""
        );

        // ✅ Merge API data while preventing duplicates
        state.featureImageList = Array.from(
          new Set([...state.featureImageList, ...validImages])
        );
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
