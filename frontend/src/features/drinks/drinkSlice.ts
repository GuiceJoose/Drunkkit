import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import drinkService from "./drinkService";
// Get user from localStorage
const retrievedUser = localStorage.getItem("user");
const user: string = retrievedUser !== null ? JSON.parse(retrievedUser) : "";

interface DrinkState {
  drinks: [];
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
  drinks: [],
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

export const getDrinks = createAsyncThunk<any, void, { state: RootState }>(
  "drinks/getAll",
  async (_, thunkAPI) => {
    try {
      const token: string = thunkAPI.getState().auth.user.token;
      return await drinkService.getDrinks(token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

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
      })
      .addCase(getDrinks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDrinks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.drinks = action.payload;
      })
      .addCase(getDrinks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
      });
  },
});

export const { reset } = drinkSlice.actions;
export default drinkSlice.reducer;
