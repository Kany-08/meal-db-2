import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { MealInfo } from "../../model/meal";
import { loadMeals } from "../../api/mealDB";

export type MealsState = {
  meals: MealInfo[];
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
        state.meals = payload;
        state.mealsLoading = false;
      })
      .addCase(loadCategoryMeals.rejected, (state) => {
        state.mealsLoading = false;
      });
  },
  selectors: {
    selectMeals: (state) => state.meals,
    selectMealsLoading: (state) => state.mealsLoading,
  },
});

export const { selectMeals, selectMealsLoading } = meals.selectors;

export default meals.reducer;
