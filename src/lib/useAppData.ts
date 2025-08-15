import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { loadCategories } from "../api/mealDB";
import { setCategories } from "../store/features/categoriesSlice";

export const useAppData = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    loadCategories().then((data) => {
      dispatch(setCategories(data));
    });
  }, []);
};
