import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchProductClassificationPage = createAsyncThunk(
    "fetchProductClassificationPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/제품분류")
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

const productClassificationSlice = createSlice(
    {
        name: "productClassificationSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchProductClassificationPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchProductClassificationPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchProductClassificationPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default productClassificationSlice.reducer;