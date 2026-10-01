import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "@/lib/store/contentSlice";
import reviewReducer from "@/lib/store/reviewSlice";

export const store = configureStore({
  reducer: {
    content: contentReducer,
    review: reviewReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
