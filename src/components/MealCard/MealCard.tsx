import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import S from "./MealCard.module.css";
import type { MealInfo } from "../../model/meal";

export function MealCard({ image, name }: MealInfo) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Подробнее</Button>
      </CardActions>
    </Card>
  );
}
