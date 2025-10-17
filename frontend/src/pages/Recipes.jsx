import { useNavigate, Link, useLoaderData } from "react-router-dom";

import RecipeList from "../components/RecipeList";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";

export default function Recipes() {
  const navigate = useNavigate();
  const { recipes: data, totalItems, page } = useLoaderData();

  const ITEMS_PER_PAGE = 2; // ajustá según tu backend
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

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
              <h1 className="text-[34px] font-semibold">Todas las recetas</h1>
              <img className="size-8" src={EditIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>
        <RecipeList recipes={data} />
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
    </>
  );
}

export async function loader({ request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;

  const response = await fetch(`http://localhost:8080/feed/posts?page=${page}`);
  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Error en Recipes.jsx" }), {
      status: 500,
    });
  }

  const resData = await response.json();
  return { recipes: resData.recipes, totalItems: resData.totalItems, page };
}
