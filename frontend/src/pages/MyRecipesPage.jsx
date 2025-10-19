import { useNavigate, Link } from "react-router-dom";

import LinkButton from "../components/LinkButton";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";
import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";
import Carbonata from "/img/recipes/carbonara3x.webp";

export default function MyRecipesPage() {
  const navigate = useNavigate();
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
              <h1 className="text-[34px] font-semibold">Mis Recetas</h1>
              <img className="size-8" src={EditIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>
        <div to="#" className="flex flex-col  items-center gap-2  w-full">
          {/*CARDD*/}
          <div
            className="p-5 w-[95%] rounded-2xl border border-black/5 bg-white flex flex-col items-center   shadow-[0_0_6px_rgba(0,0,0,0.14)]
"
          >
            <img
              src={Carbonata}
              alt="Carbonata"
              className="h-full object-cover rounded-2xl "
            />
            {/* INFORMACION DE LA RECETA */}
            <div className="self-start mb-10">
              {" "}
              <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
                Spagueti ala carbonarddadd
              </h1>
              <div className="flex flex-row justify-between mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3">
                <span className="inline-flex items-center gap-1">
                  {" "}
                  <img className="size-4" src={FireIcon} alt="" />
                  500 Kcal
                </span>{" "}
                <span className="mx-1">•</span>
                <span className="inline-flex items-center  gap-1 ">
                  {" "}
                  <img className="size-4" src={ClockIcon} alt="" />
                  20 min
                </span>
                <span className="mx-1">•</span>
                <span className="inline-flex items-center gap-1">
                  <img src={MealIcon} alt="" />
                  <span>35 min</span>
                </span>
              </div>{" "}
            </div>
            {/* BOTONES */}
            <div className="mt-1 grid w-full grid-cols-2 gap-3">
              <LinkButton variant="primary" className="w-full">
                Visualizar
              </LinkButton>
              <LinkButton variant="tertiary" className="w-full">
                Editar receta
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
