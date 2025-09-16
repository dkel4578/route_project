import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchProductPage = createAsyncThunk(
    "fetchProductPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/제품")
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

const productSlice = createSlice(
    {
        name: "productSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchProductPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchProductPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchProductPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default productSlice.reducer;