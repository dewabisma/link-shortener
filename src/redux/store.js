import { configureStore } from "@reduxjs/toolkit";
import shortenedUrlReducer from "./shortenedLink/shortenedLinkSlice";

export default configureStore({
  reducer: {
    shortenedUrl: shortenedUrlReducer,
  },
});
