import { Container, Grid } from "@mui/material";
import "./App.css";
import { AppProvider } from "./components/AppProvider";
import { CategoryList } from "./components/CategoryList/CategoryList";
import { MealList } from "./components/MealList/MealList";
import { MealModal } from "./components/MealModal/MealModal";

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
      <MealModal />
    </AppProvider>
  );
}

export default App;
