import { Grid } from "@mui/material";
import { useAppSelector } from "../../store";
import { selectMeals } from "../../store/features/mealsSlice";
import S from "./MealList.module.css";
import { MealCard } from "../MealCard/MealCard";
import { selectCurrentCategory } from "../../store/features/categoriesSlice";

export function MealList() {
  const data = useAppSelector(selectMeals);
  const category = useAppSelector(selectCurrentCategory);
  return (
    <Grid container spacing={2}>
      {data.map((card) => (
        <Grid size={6}>
          <MealCard {...card} key={card.id} />
        </Grid>
      ))}
      {!category && <Grid>Выберите категорию</Grid>}
    </Grid>
  );
}
