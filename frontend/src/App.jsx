import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import NewRecipePage from "./pages/NewRecipePage";
import EditRecipePage from "./pages/EditRecipePage";
import ViewRecipePage from "./pages/ViewRecipePage";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AuthLayout from "./pages/AuthLayout.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RecipesPage from "./pages/Recipes.jsx";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "homepage", element: <HomePage /> },

      { path: "favorite-recipe", element: <FavoriteRecipePage /> },
      { path: "my-recipes", element: <MyRecipesPage /> },
      { path: "recipes", element: <RecipesPage /> }, // listado global
      { path: "recipes/new", element: <NewRecipePage /> }, // listado global
      { path: "recipes/:id", element: <ViewRecipePage /> }, // detalle
      { path: "recipes/:id/edit", element: <EditRecipePage /> }, // detalle
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
