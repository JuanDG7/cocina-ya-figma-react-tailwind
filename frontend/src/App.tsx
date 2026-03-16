import { RouterProvider, createBrowserRouter } from "react-router-dom";

import LoginPage, { action as loginAction } from "./pages/LoginPage";
import RegisterPage, { action as authAction } from "./pages/RegisterPage";
import HomePage, { loader as homePageLoader } from "./pages/HomePage";
import RecipeNew from "./pages/RecipeNew";
import RecipeEdit from "./pages/RecipeEdit";
import RecipeDetail, {
  loader as recipeDetailLoader,
  action as deleteRecipeAction,
} from "./pages/RecipeDetail";
import FavoriteRecipePage from "./pages/FavoriteRecipePage";
import MyRecipesPage, {
  loader as myRecipesLoader,
} from "./pages/MyRecipesPage";
import AuthLayout from "./pages/AuthLayout";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import RecipesPage, { loader as recipeLoader } from "./pages/RecipesPage";
import { action as manipulateRecipeAction } from "./components/RecipeForm";
import { requireAuth } from "./util/auth";

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
    loader: requireAuth,
    children: [
      { path: "homepage", element: <HomePage />, loader: homePageLoader },

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
