import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Meal, MealInfo } from "../../model/meal";
import { findMealById, loadMeals } from "../../api/mealDB";

export type MealsState = {
  meals: MealInfo[];
  mealsLoading: boolean;
  selectedMealId: string | null;
  meal: Meal | null;
};

const initialState: MealsState = {
  meals: [],
  mealsLoading: false,
  selectedMealId: null,
  meal: null,
};

export const loadCategoryMeals = createAsyncThunk(
  "meals/loadCategoryMeals",
  (category: string) => {
    return loadMeals({
      category,
    });
  }
);

export const loadMeal = createAsyncThunk("meals/loadMeal", (id: string) => {
  return findMealById(id);
});

const meals = createSlice({
  name: "meals",
  initialState,
  reducers: {
    setCurrentMealId(state, { payload }: PayloadAction<string>) {
      state.selectedMealId = payload;
    },
    setMeal(state, { payload }: PayloadAction<Meal>) {
      state.meal = payload;
    },
    unsetMeal(state) {
      state.meal = null;
    },
  },
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
      })
      .addCase(loadMeal.fulfilled, (state, { payload }) => {
        console.log(payload);
        state.meal = payload;
      });
  },
  selectors: {
    selectMeals: (state) => state.meals,
    selectMealsLoading: (state) => state.mealsLoading,
    selectCurrentMealId: (state) => state.selectedMealId,
    selectMeal: (state) => state.meal,
  },
});

export const { setCurrentMealId, setMeal, unsetMeal } = meals.actions;

export const {
  selectMeal,
  selectMeals,
  selectMealsLoading,
  selectCurrentMealId,
} = meals.selectors;

export default meals.reducer;
