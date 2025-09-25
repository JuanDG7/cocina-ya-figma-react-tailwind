import { useNavigate } from "react-router-dom";

import Button from "../components/Button";

import HeartOutlineIcon from "../assets/icons/icon-heart-outline.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";
import ingrediente1 from "/img/ingredientes/ingrediente1.webp";
import ingrediente2 from "/img/ingredientes/ingrediente2.webp";
import ingrediente3 from "/img/ingredientes/ingrediente3.webp";
import ingrediente4 from "/img/ingredientes/ingrediente4.webp";
import ingrediente5 from "/img/ingredientes/ingrediente5.webp";
import ingrediente6 from "/img/ingredientes/ingrediente6.webp";
import Carbonata from "/img/recipes/Carbonara3xImageHolder.webp";

export default function ViewRecipePage() {
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
              <h1 className="text-[34px] font-semibold">Visualizar Receta</h1>
              <img className="size-8" src={HeartOutlineIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>

        <div className="flex flex-col p-4 w-[90%] max-w-screen-lg mx-auto gap-y-8  items-start border border-black/20 rounded-2xl   shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
          <img className="object-cover rounded-xl  " src={Carbonata} alt="" />
          <div>
            {" "}
            {/* Título */}
            <h1 className="px-4 py-4 text-[30px] font-bold leading-[36px]">
              Spaghetti a la Carbonara Cremosa
            </h1>
            {/* Información adicional */}
            <div className="flex w-full items-center justify-start gap-4 px-4 pb-2 text-[14px] leading-[20px]">
              <span className="inline-flex items-center gap-2">
                <img className="h-5 w-5" src={FireIcon} alt="" />
                <span>590 Kcal</span>
              </span>

              <span aria-hidden="true">•</span>

              <span className="inline-flex items-center gap-2">
                <img className="h-5 w-5" src={ClockIcon} alt="" />
                <span>20 min</span>
              </span>

              <span aria-hidden="true">•</span>

              <span className="inline-flex items-center gap-2">
                <img className="h-5 w-5" src={MealIcon} alt="" />
                <span>5 porciones</span>
              </span>
            </div>
          </div>
          {/*INGREDIENTES*/}

          <h2 className="px-4 pt-6 text-[18px] font-medium">Ingredientes</h2>

          <ul className="my-2 px-6 space-y-3 text-[16px] list-disc list-inside ">
            <li className=" marker:text-primary pb-2 border-b border-dashed border-primary">
              500 gramos fideos secos spaguettis
            </li>
            <li className=" marker:text-primary pb-2 border-b border-dashed border-primary">
              200 gramos panceta
            </li>
            <li className=" marker:text-primary pb-2 border-b border-dashed border-primary">
              2 cebollas chicas o 1 mediana
            </li>
            <li className=" marker:text-primary pb-2 border-b border-dashed border-primary">
              5 yemas de huevo
            </li>
            <li className=" marker:text-primary pb-2 border-b border-dashed border-primary">
              2 dientes de ajo
            </li>
          </ul>

          <h2 className="px-4 pt-6 text-[18px] font-medium">Pasos</h2>

          <ol className="mt-4 mb-10 space-y-6 px-4">
            <li className="flex items-start gap-3">
              {/* Círculo con número */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold">
                1
              </span>
              {/* Contenido del paso */}
              <div className="flex flex-col gap-3">
                <p className="text-[16px] leading-[24px]">
                  Ponemos agua en una cacerola, cuando rompa el hervor agregamos
                  sal a gusto y los fideos… agregamos la panceta cortada en
                  cubitos.
                </p>
                <div className="flex gap-3">
                  <img
                    src={ingrediente1}
                    alt="Ingredientes ajo, cebolla y panceta"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <img
                    src={ingrediente2}
                    alt="Panceta cortada y paquete de fideos"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              {/* Círculo con número */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold">
                2
              </span>
              {/* Contenido del paso */}
              <div className="flex flex-col gap-3">
                <p className="text-[16px] leading-[24px]">
                  Ponemos agua en una cacerola, cuando rompa el hervor agregamos
                  sal a gusto y los fideos… agregamos la panceta cortada en
                  cubitos.
                </p>
                <div className="flex gap-3">
                  <img
                    src={ingrediente3}
                    alt="Ingredientes ajo, cebolla y panceta"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <img
                    src={ingrediente4}
                    alt="Panceta cortada y paquete de fideos"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                </div>
              </div>
            </li>
            <li className="flex items-start gap-3">
              {/* Círculo con número */}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold">
                3
              </span>
              {/* Contenido del paso */}
              <div className="flex flex-col gap-3">
                <p className="text-[16px] leading-[24px]">
                  Ponemos agua en una cacerola, cuando rompa el hervor agregamos
                  sal a gusto y los fideos… agregamos la panceta cortada en
                  cubitos.
                </p>
                <div className="flex gap-3">
                  <img
                    src={ingrediente5}
                    alt="Ingredientes ajo, cebolla y panceta"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                  <img
                    src={ingrediente6}
                    alt="Panceta cortada y paquete de fideos"
                    className="h-28 w-28 rounded-lg object-cover"
                  />
                </div>
              </div>
            </li>
          </ol>
          <div className="w-full mb-28 text-center ">
            <Button className="" variant="secondary">
              Modificar Receta
            </Button>{" "}
          </div>
        </div>
      </div>
    </>
  );
}
