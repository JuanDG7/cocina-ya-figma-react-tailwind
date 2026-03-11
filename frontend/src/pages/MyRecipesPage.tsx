import {
  useNavigate,
  Link,
  useLoaderData,
  LoaderFunctionArgs,
  redirect,
} from "react-router-dom";

import type { Recipe } from "../types/recipe";
import LinkButton from "../components/LinkButton";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";
import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";

import { getToken } from "../util/auth";
import api from "../lib/axios";

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

      <div className="w-full px-4">
        {recipes.length === 0 && (
          <p className="text-gray-500 text-center mt-5">
            Aún no tienes recetas creadas.
          </p>
        )}

        {/* Cards estilo homepage + 2 botones abajo */}
        <ul className="flex flex-wrap justify-center gap-4">
          {recipes.map((recipe) => (
            <li
              key={recipe._id}
              className="w-full max-w-[240px] rounded-2xl border border-black/5 bg-white p-3 shadow-[0_0_6px_rgba(0,0,0,0.08)]"
            >
              <div className="overflow-hidden rounded-[20px]">
                <img
                  src={`http://localhost:8080/${recipe.imageUrl}`}
                  alt={recipe.titulo}
                  className="w-full h-[170px] object-cover"
                />
              </div>

              <div className="mt-3">
                <h2 className="text-[18px] leading-[22px] font-medium text-oscuro">
                  {recipe.titulo}
                </h2>

                <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] leading-[12px] font-worksans text-oscuro">
                  <span className="inline-flex items-center gap-1">
                    <img className="size-4" src={FireIcon} alt="" />
                    {recipe.calorias} Kcal
                  </span>

                  <span>•</span>

                  <span className="inline-flex items-center gap-1">
                    <img className="size-4" src={ClockIcon} alt="" />
                    {recipe.tiempoMin} min
                  </span>

                  <span>•</span>

                  <span className="inline-flex items-center gap-1">
                    <img className="size-4" src={MealIcon} alt="" />
                    {recipe.porciones}
                  </span>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <LinkButton
                  to={`/recipes/${recipe._id}`}
                  variant="primary"
                  className="py-[3px] px-2 text-xs rounded-full"
                >
                  Visualizar
                </LinkButton>

                <LinkButton
                  to={`/recipes/${recipe._id}/edit`}
                  variant="tertiary"
                  className="py-[3px] px-2 text-xs rounded-full"
                >
                  Editar
                </LinkButton>
              </div>
            </li>
          ))}
        </ul>

        {/* Paginación */}
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
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  try {
    const { data } = await api.get("/recipe/my-recipes", {
      params: { page },
    });
    return {
      recipes: data.recipes,
      totalItems: data.totalItems,
      page: Number(page),
    };
  } catch (error: any) {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      return redirect("/");
    }
    throw new Response(
      JSON.stringify({ message: "Error al cargar tus recetas" }),
      { status: error.response?.status || 500 }
    );
  }
}

// export async function loader({ request }: LoaderFunctionArgs) {
//   const url = new URL(request.url);
//   const page = url.searchParams.get("page") || 1;

//   const token = getToken();
//   if (!token) return redirect("/");

//   const response = await fetch(
//     `http://localhost:8080/recipe/my-recipes?page=${page}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token,
//       },
//     }
//   );

//   if (response.status === 401) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userId");
//     return redirect("/");
//   }

//   if (!response.ok) {
//     throw new Response(
//       JSON.stringify({ message: "Error al cargar tus recetas" }),
//       { status: response.status }
//     );
//   }

//   const resData = await response.json();

//   return {
//     recipes: resData.recipes,
//     totalItems: resData.totalItems,
//     page: Number(page),
//   };
// }
