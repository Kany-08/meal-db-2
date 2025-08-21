import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectMeal, unsetMeal } from "../../store/features/mealsSlice";

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
      <Box>
        <Card>
          <CardMedia
            image={meal.image}
            title={meal.name}
            sx={{ width: 200, height: 200 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {meal.name}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
}
