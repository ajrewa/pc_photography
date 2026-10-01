import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { submitReview, uploadReviewImage, type ReviewPayload } from "@/lib/services/review.service";

type ReviewState = ReviewPayload & {
  submitting: boolean;
  uploading: boolean;
  message: string;
  error: string;
};

const initialState: ReviewState = {
  author: "",
  image: "",
  order: "",
  quote: "",
  role: "bride",
  submitting: false,
  uploading: false,
  message: "",
  error: "",
};

export const uploadReviewImageThunk = createAsyncThunk("review/uploadImage", uploadReviewImage);
export const submitReviewThunk = createAsyncThunk("review/submit", submitReview);

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    setField: (state, action: PayloadAction<{ field: keyof ReviewPayload; value: string }>) => {
      state[action.payload.field] = action.payload.value;
      state.error = "";
    },
    clearReview: () => initialState,
    clearReviewMessage: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadReviewImageThunk.pending, (state) => {
        state.uploading = true;
        state.error = "";
      })
      .addCase(uploadReviewImageThunk.fulfilled, (state, action) => {
        state.uploading = false;
        state.image = action.payload;
      })
      .addCase(uploadReviewImageThunk.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.error.message || "Image upload failed.";
      })
      .addCase(submitReviewThunk.pending, (state) => {
        state.submitting = true;
        state.message = "";
        state.error = "";
      })
      .addCase(submitReviewThunk.fulfilled, () => ({ ...initialState, message: "Thank you! Your review has been submitted." }))
      .addCase(submitReviewThunk.rejected, (state, action) => {
        state.submitting = false;
        state.error = action.error.message || "Something went wrong. Please try again.";
      });
  },
});

export const { setField, clearReview, clearReviewMessage } = reviewSlice.actions;
export default reviewSlice.reducer;
