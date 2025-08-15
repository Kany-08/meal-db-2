import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "../../model/category";

export type CategoriesState = {
  categories: Category[];
  currentCategory: string | null;
};

const initialState: CategoriesState = {
  categories: [],
  currentCategory: null,
};

const categories = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(
      state: CategoriesState,
      { payload }: PayloadAction<Category[]>
    ) {
      state.categories = payload;
    },
    setCurrentCategory(
      state: CategoriesState,
      { payload }: PayloadAction<string>
    ) {
      state.currentCategory = payload;
    },
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCurrentCategory: (state) => state.currentCategory,
  },
});

export const { setCategories, setCurrentCategory } = categories.actions;
export const { selectCategories, selectCurrentCategory } = categories.selectors;

export default categories.reducer;
