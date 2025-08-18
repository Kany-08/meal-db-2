import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Meal } from "../../model/meal";
import { loadMeals } from "../../api/mealDB";

export type MealsState = {
  meals: Meal[];
  mealsLoading: boolean;
};

const initialState: MealsState = {
  meals: [],
  mealsLoading: false,
};

export const loadCategoryMeals = createAsyncThunk(
  "meals/loadCategoryMeals",
  (category: string) => {
    return loadMeals({
      category,
    });
  }
);

const meals = createSlice({
  name: "meals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadCategoryMeals.pending, (state) => {
        state.mealsLoading = true;
      })
      .addCase(loadCategoryMeals.fulfilled, (state, { payload }) => {
        // state.meals = payload.meals
        state.mealsLoading = false;
      })
      .addCase(loadCategoryMeals.rejected, (state) => {
        state.mealsLoading = false;
      });
  },
});

export default meals.reducer;
