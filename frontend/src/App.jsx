import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NewRecipePage from "./pages/NewRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import ViewRecipePage from "./pages/ViewRecipePage";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
import MyRecipesPage from "./pages/MyRecipesPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "register",
    element: <RegisterPage />,
  },
  { path: "homepage", element: <HomePage /> },
  { path: "new-recipe", element: <NewRecipePage /> },
  { path: "edit-recipe", element: <EditRecipePage /> },
  { path: "view-recipe", element: <ViewRecipePage /> },
  { path: "favorite-recipe", element: <FavoriteRecipePage /> },
  { path: "my-recipes", element: <MyRecipesPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
