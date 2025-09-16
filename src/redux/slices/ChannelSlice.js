import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from "axios";

export const fetchChannelPage = createAsyncThunk(
    "fetchChannelPage",
    async (_, thunkAPI) => {
        try{
            const response = await axios.get("http://localhost:3001/채널")
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

const channelSlice = createSlice(
    {
        name: "channelSlice",
        initialState,
        reducers: {},
        extraReducers: (builder) => {
           builder
             .addCase(fetchChannelPage.pending, (state) => {
               state.loading = true;
             })
             .addCase(fetchChannelPage.fulfilled, (state, action) => {
               state.loading = false;
               state.data = action.payload;
             })
             .addCase(fetchChannelPage.rejected, (state, action) => {
               state.loading = false;
               state.error = action.payload;
             });
        },
    }
)

export default channelSlice.reducer;