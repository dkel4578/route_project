import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchCategoryPage = createAsyncThunk(
    "fetchCategoryPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/분류")
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

const categorySlice = createSlice(
    {
        name: "categorySlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchCategoryPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchCategoryPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchCategoryPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default categorySlice.reducer;