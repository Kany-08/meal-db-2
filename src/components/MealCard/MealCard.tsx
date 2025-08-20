import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import type { MealInfo } from "../../model/meal";
import S from "./MealCard.module.css";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store";
import {
  selectCurrentMealId,
  setCurrentMealId,
} from "../../store/features/mealsSlice";
import * as C from "./ModalCard.components";

export function MealCard({ image, name }: MealInfo) {
  const dispatch = useDispatch();
  const selectedName = useAppSelector(selectCurrentMealId);
  const isSelected = selectedName === name;

  const select = () => {
    dispatch(setCurrentMealId(name));
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
