import axios from "axios";
import type {
  APICategory,
  APICategoryList,
  APIMeal,
  APIMealInfo,
  APIMealList,
  APISearchList,
} from "../model/api";
import type { Category } from "../model/category";
import type { Meal, MealInfo } from "../model/meal";

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

  return data.meals.map(transformAPIMeal);
};

const transformAPIMeal = (apiMeal: APIMealInfo): MealInfo => {
  return {
    id: apiMeal.idMeal,
    name: apiMeal.strMeal,
    image: apiMeal.strMealThumb,
  };
};

export const searchMeals = async (query: string) => {
  const url = `search.php?s=${query}`;

  const { data } = await mealDB.get<APISearchList>(url);

  return data.meals.map(transformAPISearch);
};

const transformAPISearch = (apiMeal: APIMeal): Meal => {
  return {
    ...transformAPIMeal(apiMeal),
    ...(apiMeal.strMealAlternate
      ? {
          alternate: apiMeal.strMealAlternate,
        }
      : {}),
  };
};
