import {
  useNavigate,
  Link,
  useLoaderData,
  LoaderFunctionArgs,
} from "react-router-dom";

import type { Recipe } from "../types/recipe";
import LinkButton from "../components/LinkButton";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";
import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";

type MyRecipesLoaderData = {
  recipes: Recipe[];
  totalItems: number;
  page: number;
};

export default function MyRecipesPage() {
  const navigate = useNavigate();
  const { recipes, totalItems, page } = useLoaderData() as MyRecipesLoaderData;

  const ITEMS_PER_PAGE = 2;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      <div>
        {/* Header superior */}
        <header className="pt-10 pr-4 pb-4 pl-4 mb-8 bg-[url(/img/background.svg)] rounded-b-2xl bg-cover bg-center">
          <div className="flex justify-between items-center">
            <button
              className="h-11 w-11 flex items-center justify-center"
              onClick={() => navigate(-1)}
            >
              <img className="h-[24px] w-[24px]" src={IconLeftArrow} alt="" />
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-[34px] font-semibold">Mis Recetas</h1>
              <img className="size-8" src={EditIcon} alt="" />
            </div>
            <div className="h-11 w-11" aria-hidden />
          </div>
        </header>

        <div className="flex flex-col items-center gap-2 w-full">
          {/* 🔹 Mostrar mensaje si no hay recetas */}
          {recipes.length === 0 && (
            <p className="text-gray-500 text-center mt-5">
              Aún no tienes recetas creadas.
            </p>
          )}

          {/* 🔹 Renderizar recetas reales */}
          {recipes.map((recipe) => (
            <div
              key={recipe._id}
              className="p-5 w-[95%] rounded-2xl border border-black/5 bg-white flex flex-col items-center shadow-[0_0_6px_rgba(0,0,0,0.14)]"
            >
              <img
                src={`http://localhost:8080/${recipe.imageUrl}`}
                alt={recipe.titulo}
                className="h-full object-cover rounded-2xl"
              />
              <div className="self-start mb-10">
                <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
                  {recipe.titulo}
                </h1>
                <div className="flex flex-row justify-between mt-2 text-[12px] leading-[12px] font-normal text-oscuro font-worksans items-center pb-3">
                  <span className="inline-flex items-center gap-1">
                    <img className="size-4" src={FireIcon} alt="" />
                    {recipe.calorias} Kcal
                  </span>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center gap-1">
                    <img className="size-4" src={ClockIcon} alt="" />
                    {recipe.tiempoMin} min
                  </span>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center gap-1">
                    <img src={MealIcon} alt="" />
                    <span>{recipe.porciones} porciones</span>
                  </span>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-1 grid w-full grid-cols-2 gap-3">
                <LinkButton
                  to={`/recipes/${recipe._id}`}
                  variant="primary"
                  className="w-full"
                >
                  Visualizar
                </LinkButton>
                <LinkButton
                  to={`/recipes/${recipe._id}/edit`}
                  variant="tertiary"
                  className="w-full"
                >
                  Editar receta
                </LinkButton>
              </div>
            </div>
          ))}

          {/* 🔹 Paginación */}
          <div className="flex justify-center gap-4 mt-8 mb-12">
            {page > 1 && (
              <Link
                to={`?page=${Number(page) - 1}`}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                ← Anterior
              </Link>
            )}
            {page < totalPages && (
              <Link
                to={`?page=${Number(page) + 1}`}
                className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
              >
                Siguiente →
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  const token = localStorage.getItem("token");

  const response = await fetch(
    `http://localhost:8080/recipe/my-recipes?page=${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (!response.ok) {
    throw new Response(
      JSON.stringify({ message: "Error al cargar tus recetas" }),
      { status: 500 }
    );
  }

  const resData = await response.json();
  return { recipes: resData.recipes, totalItems: resData.totalItems, page };
}
