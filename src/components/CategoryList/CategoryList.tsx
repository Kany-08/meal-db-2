import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const categories = ["Завтрак", "Обед", "Ужин"];

export function CategoryList() {
  return (
    <List>
      {categories.map((category) => (
        <ListItem disablePadding key={category}>
          <ListItemButton>
            <ListItemText primary={category} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
