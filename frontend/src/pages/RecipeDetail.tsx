import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  redirect,
  useNavigate,
  useRouteLoaderData,
} from "react-router-dom";
import type { Recipe } from "../types/recipe";

import HeartOutlineIcon from "../assets/icons/icon-heart-outline.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import RecipeItem from "../components/RecipeItem";

type RecipeLoaderData = {
  recipe: Recipe;
};

export default function ViewRecipePage() {
  const navigate = useNavigate();
  const data = useRouteLoaderData("recipe") as RecipeLoaderData;

  return (
    <>
      <div>
        {/*  Header del top*/}
        <header className=" pt-10 pr-4 pb-4 pl-4 mb-8 bg-[url(/img/background.svg)] rounded-b-2xl bg-cover bg-center">
          <div className=" flex justify-between items-center">
            <button
              className="h-11 w-11 flex items-center justify-center "
              onClick={() => navigate(-1)}
            >
              {/*FLECHITA A LA IZQUIERDA*/}
              <img className="h-[24px] w-[24px]" src={IconLeftArrow} alt="" />
            </button>
            {/*TITULO Y CORAZON */}
            <div className="flex items-center gap-2">
              <h1 className="text-[34px] font-semibold">Visualizar Receta</h1>
              <img className="size-8" src={HeartOutlineIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>

        <RecipeItem recipe={data.recipe} />
      </div>
    </>
  );
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const id = params.recipeId;

  const token = localStorage.getItem("token");
  const response = await fetch(`http://localhost:8080/recipe/${id}`, {
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "error en el loader de RecipeDetail.jsx" }),
      { status: response.status }
    );
  } else {
    const data = await response.json();
    return data;
  }
}

export async function action({ request, params }: ActionFunctionArgs) {
  const recipeId = params.recipeId;

  const token = localStorage.getItem("token");

  const response = await fetch(`http://localhost:8080/recipe/${recipeId}`, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Error al eliminar la receta" }),
      { status: response.status }
    );
  }

  return redirect("/homepage");
}
