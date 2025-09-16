import {configureStore} from "@reduxjs/toolkit";
import salesReducer from "./slices/salesSlice.js";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import locationReducer from "./slices/locationSlice.js";
import promotionReducer from "./slices/promotionSlice.js";
import productClassificationReducer from "./slices/ProductClassificationSlice.js";
import dateReducer from "./slices/dateSlice.js";
import channelReducer from "./slices/channelSlice.js";
import userReducer from "./slices/userSlice.js";
const store = configureStore({
    reducer: {
        product: productReducer,
        sales: salesReducer,
        category: categoryReducer,
        location: locationReducer,
        promotion: promotionReducer,
        productClassification: productClassificationReducer,
        date: dateReducer,
        channel: channelReducer,
        user: userReducer,
    }
})

export default store;