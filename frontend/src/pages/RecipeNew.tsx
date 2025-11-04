import { useNavigate } from "react-router-dom";

import RecipeForm from "../components/RecipeForm";

import HeartOutlineIcon from "../assets/icons/icon-heart-outline.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";

export default function NewRecipePage() {
  const navigate = useNavigate();

  return (
    <>
      {/* Frame  */}
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
              <h1 className="text-[34px] font-semibold">Crear Receta</h1>
              <img className="size-8" src={HeartOutlineIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>

        <section className="px-4  ">
          {/* AQUI EMPIEZA */}
          <RecipeForm method="post" />
        </section>
      </div>
    </>
  );
}
