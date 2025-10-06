import { useNavigate, Link, useLoaderData } from "react-router-dom";

import RecipeList from "../components/RecipeList";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";

export default function Recipes() {
  const navigate = useNavigate();
  const data = useLoaderData();
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
      </div>
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:8080/feed/posts");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Error en Recipes.jsx" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData;
  }
}
