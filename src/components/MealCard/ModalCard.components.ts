import styled from "@emotion/styled";

import { Card, CardMedia, css } from "@mui/material";

export const Image = styled(CardMedia)`
  height: 140px;
`;

export const Container = styled(Card)<{ selected?: boolean }>`
  max-width: 345px;
  ${({ selected }) =>
    selected &&
    css`
      border: 1px solid gold;
    `}
`;
