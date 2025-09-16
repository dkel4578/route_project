import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchPromotionPage = createAsyncThunk(
    "fetchPromotionPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/프로모션")
                return response.data // json ?
        } catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
)

const initialState = {
    data:[],
    loading: false,
    error: null,
}

const promotionSlice = createSlice(
    {
        name: "promotionSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchPromotionPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchPromotionPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchPromotionPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default promotionSlice.reducer;