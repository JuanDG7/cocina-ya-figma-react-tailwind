import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as authAction } from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RecipeNew from "./pages/RecipeNew.js";
import RecipeEdit from "./pages/RecipeEdit.js";
import RecipeDetail, {
  loader as recipeDetailLoader,
  action as deleteRecipeAction,
} from "./pages/RecipeDetail.js";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
import MyRecipesPage, {
  loader as myRecipesLoader,
} from "./pages/MyRecipesPage";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout.js";
import ErrorPage from "./pages/ErrorPage.js";
import RecipesPage, { loader as recipeLoader } from "./pages/RecipesPage.js";
import { action as manipulateRecipeAction } from "./components/RecipeForm.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LoginPage />,
        action: loginAction,
      },
      {
        path: "register",
        element: <RegisterPage />,
        action: authAction,
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
      {
        path: "my-recipes",
        element: <MyRecipesPage />,
        loader: myRecipesLoader,
      },
      { path: "recipes", element: <RecipesPage />, loader: recipeLoader }, //
      {
        path: "recipes/new",
        element: <RecipeNew />,
        action: manipulateRecipeAction,
      }, //
      {
        path: "recipes/:recipeId",
        loader: recipeDetailLoader,
        id: "recipe",

        children: [
          {
            index: true,
            element: <RecipeDetail />,
            action: deleteRecipeAction,
          }, //
          {
            path: "edit",
            element: <RecipeEdit />,
            action: manipulateRecipeAction,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
