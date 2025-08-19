import { Container, Grid } from "@mui/material";
import "./App.css";
import { AppProvider } from "./components/AppProvider";
import { CategoryList } from "./components/CategoryList/CategoryList";
import { MealList } from "./components/MealList/MealList";

function App() {
  return (
    <AppProvider>
      <Container>
        <Grid container spacing={2}>
          <Grid size={3}>
            <CategoryList />
          </Grid>
          <Grid size={9}>
            <MealList />
          </Grid>
        </Grid>
      </Container>
    </AppProvider>
  );
}

export default App;
