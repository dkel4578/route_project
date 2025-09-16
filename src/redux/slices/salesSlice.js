import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchSalePage = createAsyncThunk(
    "fetchSalePage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/판매")
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

const salesSlice = createSlice(
    {
        name: "salesSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchSalePage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchSalePage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchSalePage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default salesSlice.reducer;