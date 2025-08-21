import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectMeal, unsetMeal } from "../../store/features/mealsSlice";

import TerrainIcon from "@mui/icons-material/Terrain";
import CategoryIcon from "@mui/icons-material/Category";

import * as C from "./MealModal.components";
import { RichText } from "../RichText/RichText";
import { Fragment } from "react/jsx-runtime";

export function MealModal() {
  const dispatch = useAppDispatch();
  const meal = useAppSelector(selectMeal);
  const open = meal !== null;

  const close = () => {
    dispatch(unsetMeal());
  };

  if (!open) {
    return;
  }
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <C.Content>
        <C.MealCard>
          <C.Image image={meal.image} title={meal.name} />
          <C.MealContent>
            <Typography gutterBottom variant="h5" component="div">
              {meal.name}
            </Typography>
            <Grid container gap={1}>
              <Grid>
                <CategoryIcon />
              </Grid>
              <Grid>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {meal.categoryName}
                </Typography>
              </Grid>
              <Grid>
                <TerrainIcon />
              </Grid>
              <Grid>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {meal.region}
                </Typography>
              </Grid>
            </Grid>
            <List>
              {meal.ingredients.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item.name} secondary={item.measure} />
                </ListItem>
              ))}
            </List>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              <RichText text={meal.instructions} />
            </Typography>

            <Grid container gap={1}>
              {meal.tags.map((tag, index) => (
                <Grid key={index}>#{tag}</Grid>
              ))}
            </Grid>
          </C.MealContent>
        </C.MealCard>
      </C.Content>
    </Modal>
  );
}
