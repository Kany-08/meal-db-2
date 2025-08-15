import axios from "axios";
import type { APICategory, APICategoryList } from "../model/api";
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
