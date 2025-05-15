import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "../features/globalSlice";

export const store = configureStore({
    reducer: {
        global: globalReducer,
    },
});
