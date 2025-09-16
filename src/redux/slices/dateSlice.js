import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchDatePage = createAsyncThunk(
    "fetchDatePage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/날짜")
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

const dateSlice = createSlice(
    {
        name: "dateSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchDatePage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchDatePage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchDatePage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default dateSlice.reducer;