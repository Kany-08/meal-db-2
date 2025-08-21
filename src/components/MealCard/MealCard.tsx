import { Button, CardActions, CardContent, Typography } from "@mui/material";
import type { MealInfo } from "../../model/meal";
import {
  loadMeal,
  selectCurrentMealId,
  setCurrentMealId,
} from "../../store/features/mealsSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import * as C from "./ModalCard.components";

export function MealCard({ image, name, id }: MealInfo) {
  const dispatch = useAppDispatch();
  const selectedId = useAppSelector(selectCurrentMealId);
  const isSelected = selectedId === id;

  const select = () => {
    dispatch(setCurrentMealId(id));
    dispatch(loadMeal(id));
  };

  return (
    <C.Container selected={isSelected}>
      <C.Image image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={select}>
          Подробнее
        </Button>
      </CardActions>
    </C.Container>
  );
}
