import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  selectCategories,
  selectCurrentCategory,
  setCurrentCategory,
} from "../../store/features/categoriesSlice";
import type { Category } from "../../model/category";
import { loadCategoryMeals } from "../../store/features/mealsSlice";

export function CategoryList() {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const currentCategory = useAppSelector(selectCurrentCategory);

  const selectCategory = (category: Category) => {
    dispatch(setCurrentCategory(category.name));
    dispatch(loadCategoryMeals(category.name));
  };

  return (
    <List>
      {categories.map((category) => (
        <ListItem disablePadding key={category.id}>
          <ListItemButton
            selected={currentCategory === category.name}
            onClick={() => selectCategory(category)}
          >
            <ListItemText primary={category.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
