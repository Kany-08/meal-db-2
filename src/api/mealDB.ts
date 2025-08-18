import axios from "axios";
import type { APICategory, APICategoryList, APIMealList } from "../model/api";
import type { Category } from "../model/category";

export const mealDB = axios.create({
  baseURL: import.meta.env.VITE_MEAL_DB_URL,
});

export const loadCategories = async () => {
  const { data } = await mealDB.get<APICategoryList>("categories.php");

  return data.categories.map(transformAPICategory);
};

export const transformAPICategory = (apiCategory: APICategory): Category => {
  return {
    id: apiCategory.idCategory,
    name: apiCategory.strCategory,
    image: apiCategory.strCategoryThumb,
    description: apiCategory.strCategoryDescription,
  };
};

type LoadMealsOptions = {
  ingredients?: string[];
  category?: string;
  area?: string;
};

export const loadMeals = async (options: LoadMealsOptions) => {
  const { ingredients, category, area } = options;
  const params = {
    ...(category ? { c: category } : {}),
    ...(ingredients ? { i: ingredients?.join(",") } : {}),
    ...(area ? { a: area } : {}),
  };
  const searchParams = new URLSearchParams(params);

  const url = `filter.php?${searchParams}`;

  const { data } = await mealDB.get<APIMealList>(url);

  return data;
};
