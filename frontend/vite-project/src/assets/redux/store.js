import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import movieReducer from "./movieSlice";
import searchReducer from "./searchSlice"; // <--- renamed for clarity

const store = configureStore({
    reducer: {
        app: userReducer,
        movie: movieReducer,
        searchMovie: searchReducer // <--- key name as per your usage
    }
});
export default store;