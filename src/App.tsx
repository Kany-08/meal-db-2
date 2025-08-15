import "./App.css";
import { AppProvider } from "./components/AppProvider";
import { CategoryList } from "./components/CategoryList/CategoryList";

function App() {
  return (
    <AppProvider>
      <CategoryList />
    </AppProvider>
  );
}

export default App;
