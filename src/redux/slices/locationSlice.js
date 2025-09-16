import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchLocationPage = createAsyncThunk(
    "fetchLocationPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/지역")
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

const locationSlice = createSlice(
    {
        name: "locationSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchLocationPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchLocationPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchLocationPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default locationSlice.reducer;