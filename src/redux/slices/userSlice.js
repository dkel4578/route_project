import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchUserPage = createAsyncThunk(
    "fetchUserPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/사용자")
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

const userSlice = createSlice(
    {
        name: "userSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchUserPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchUserPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchUserPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default userSlice.reducer;