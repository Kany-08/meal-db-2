import styled from "@emotion/styled";

import { Box, Card, CardContent, CardMedia } from "@mui/material";

export const Content = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 16px;
  background-color: white;
  box-shadow: none;
`;

export const Image = styled(CardMedia)`
  height: 140px;
`;

export const MealCard = styled(Card)``;

export const MealContent = styled(CardContent)``;
