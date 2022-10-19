import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import drinkService from "./drinkService";
// Get user from localStorage
const retrievedUser = localStorage.getItem("user");
const user: string = retrievedUser !== null ? JSON.parse(retrievedUser) : "";

interface DrinkState {
  drink: DrinkData;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

interface DrinkData {
  name: string;
  recipe: { id: string; quantity: string; ingredient: string }[];
  instructions: string;
  glass: string;
}

const initialState = {
  drink: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
} as DrinkState;

export const createDrink = createAsyncThunk<
  void,
  DrinkData,
  { state: RootState }
>("drinks/add", async (drinkData, thunkAPI) => {
  try {
    const token: string = thunkAPI.getState().auth.user.token;
    return await drinkService.createDrink(drinkData, token);
  } catch (error: any) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const drinkSlice = createSlice({
  name: "drinks",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDrink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDrink.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createDrink.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = drinkSlice.actions;
export default drinkSlice.reducer;
