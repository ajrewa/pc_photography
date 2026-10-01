import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { SiteContent } from "@/lib/content";
import { getSiteContent } from "@/lib/services/content.service";

const emptyContent: SiteContent = { hero: [], films: [], india: [], gratitude: [] };

type ContentState = {
  data: SiteContent | null;
  loading: boolean;
  error: string | null;
};

const initialState: ContentState = { data: null, loading: true, error: null };

export const fetchContent = createAsyncThunk("content/fetch", getSiteContent);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.loading = false;
        state.data = { ...emptyContent, ...action.payload };
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Could not load site content.";
        state.data = emptyContent;
      });
  },
});

export default contentSlice.reducer;
