import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RecipeNew from "./pages/RecipeNew.jsx";
import RecipeEdit from "./pages/RecipeEdit.jsx";
import RecipeDetail from "./pages/RecipeDetail.jsx";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
import MyRecipesPage from "./pages/MyRecipesPage";
import AuthLayout from "./pages/AuthLayout.jsx";
import RootLayout from "./pages/RootLayout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import RecipesPage, { loader as recipeLoader } from "./pages/Recipes.jsx";

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
    errorElement: <ErrorPage />,
    children: [
      { path: "homepage", element: <HomePage /> },

      { path: "favorite-recipe", element: <FavoriteRecipePage /> },
      { path: "my-recipes", element: <MyRecipesPage /> },
      { path: "recipes", element: <RecipesPage />, loader: recipeLoader }, //
      { path: "recipes/new", element: <RecipeNew /> }, //
      { path: "recipes/:productId", element: <RecipeDetail /> }, //
      { path: "recipes/:productId/edit", element: <RecipeEdit /> }, //
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
