import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  nanoid,
} from "@reduxjs/toolkit";
import axios from "axios";

export const createNewShortenedUrl = createAsyncThunk(
  "shortenedUrl/create",
  async (oriURL, { rejectWithValue }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post("/shorten", { url: oriURL }, config);
      const { shortcode } = data;

      const entity = {
        id: nanoid(),
        url: `https://impraise-shorty.herokuapp.com/${shortcode}`,
        shortenedUrl: oriURL,
        shortcode,
        createdAt: new Date().toISOString(),
      };

      return entity;
    } catch (error) {
      const errMsg = error.response.data;

      return rejectWithValue(errMsg);
    }
  }
);

const shortenedUrlAdapter = createEntityAdapter({
  selectId: (entity) => entity.id,
  sortComparer: (a, b) => a.createdAt.localeCompare(b.createdAt),
});

const initialState = shortenedUrlAdapter.getInitialState({
  status: "idle",
  createNewStatus: "idle",
  createNewError: null,
});

const shortenedUrlSlice = createSlice({
  name: "shortenedUrl",
  reducers: {
    addAllShortenedUrl: (state, action) => {
      const entities = action.payload;
      state.status = "loaded";
      shortenedUrlAdapter.addMany(state, entities);
    },
    clearHistory: (state, action) => {
      shortenedUrlAdapter.removeAll(state);
    },
  },
  initialState,
  extraReducers: {
    [createNewShortenedUrl.pending]: (state, action) => {
      state.createNewStatus = "loading";
      state.createNewError = null;
    },
    [createNewShortenedUrl.fulfilled]: (state, action) => {
      const entity = action.payload;
      state.createNewStatus = "success";
      shortenedUrlAdapter.addOne(state, entity);

      const entities = selectAllFromThunk(state);
      window.localStorage.setItem("history", JSON.stringify(entities));
    },
    [createNewShortenedUrl.rejected]: (state, action) => {
      const errorMsg = action.payload;
      state.createNewStatus = "failed";
      state.createNewError = errorMsg;
    },
  },
});

export const { addAllShortenedUrl, clearHistory } = shortenedUrlSlice.actions;

export default shortenedUrlSlice.reducer;

export const { selectAll, selectById } = shortenedUrlAdapter.getSelectors(
  (state) => state.shortenedUrl
);

const { selectAll: selectAllFromThunk } = shortenedUrlAdapter.getSelectors(
  (state) => state
);

export const selectShortenedUrl = (state) => {
  const data = selectAll(state);

  return { ...state.shortenedUrl, entities: data };
};
