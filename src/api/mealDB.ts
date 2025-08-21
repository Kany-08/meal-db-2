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
import type { Meal, MealInfo, MealIngredient } from "../model/meal";

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

  return data.meals.map(transformAPIMealInfo);
};

const transformAPIMealInfo = (apiMeal: APIMealInfo): MealInfo => {
  return {
    id: apiMeal.idMeal,
    name: apiMeal.strMeal,
    image: apiMeal.strMealThumb,
  };
};

export const findMealById = async (id: string) => {
  const url = `lookup.php?i=${id}`;

  const { data } = await mealDB.get<APISearchList>(url);

  const [meal] = data.meals.map(transformAPIMeal);

  return meal;
};

const transformAPIMealProp =
  (meal: APIMeal) => (prop: keyof APIMeal, targetProp: keyof Meal) => {
    const value = meal[prop];

    if (value === null) {
      return {};
    }
    return {
      [targetProp]: value,
    };
  };

const transformAPIMealIngredients = (apiMeal: APIMeal) => {
  const entries = Object.entries(apiMeal);
  const ingredients: Record<string, MealIngredient> = {};

  for (const [key, value] of entries) {
    if (key.startsWith("strIngredient") && value) {
      const index = key.replace("strIngredient", "");
      ingredients[index] = {
        name: value,
      };
    }
    if (key.startsWith("strMeasure") && value && ingredients[key]) {
      const index = key.replace("strMeasure", "");
      ingredients[index] = {
        ...ingredients[key],
        measure: value,
      };
    }
  }
  return Object.values(ingredients);
};

const transformAPIMeal = (apiMeal: APIMeal): Meal => {
  const transform = transformAPIMealProp(apiMeal);

  const ingredients = transformAPIMealIngredients(apiMeal);

  return {
    ...transformAPIMealInfo(apiMeal),
    ...transform("strMealAlternate", "alternate"),
    ...transform("strCategory", "categoryName"),
    ...transform("strArea", "region"),
    ...transform("strInstructions", "instructions"),
    ...transform("strYoutube", "youtubeUrl"),
    ...transform("strSource", "sourceUrl"),
    ...transform("strImageSource", "imageSource"),
    ingredients,
  };
};
