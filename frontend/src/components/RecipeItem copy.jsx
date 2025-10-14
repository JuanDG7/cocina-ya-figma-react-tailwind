import { useSubmit } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

import LinkButton from "../components/LinkButton";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";
import ingrediente1 from "/img/ingredientes/ingrediente1.webp";
import ingrediente2 from "/img/ingredientes/ingrediente2.webp";
import ingrediente3 from "/img/ingredientes/ingrediente3.webp";
import ingrediente4 from "/img/ingredientes/ingrediente4.webp";
import ingrediente5 from "/img/ingredientes/ingrediente5.webp";
import ingrediente6 from "/img/ingredientes/ingrediente6.webp";
import Carbonata from "/img/recipes/carbonara3x.webp";

export default function RecipeItem({ recipe }) {
  const submit = useSubmit();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col p-4 w-[90%] max-w-screen-lg mx-auto gap-y-8  items-start border border-black/20 rounded-2xl   shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
      <img className="object-cover rounded-xl  " src={Carbonata} alt="" />
      <div>
        {" "}
        {/* Título */}
        <h1 className="px-4 py-4 text-[30px] font-bold leading-[36px]">
          {recipe.titulo}
        </h1>
        {/* Información adicional */}
        <div className="flex w-full items-center justify-start gap-4 px-4 pb-2 text-[14px] leading-[20px]">
          <span className="inline-flex items-center gap-2">
            <img className="h-5 w-5" src={FireIcon} alt="" />
            <span>{recipe.calorias} Kcal</span>
          </span>

          <span aria-hidden="true">•</span>

          <span className="inline-flex items-center gap-2">
            <img className="h-5 w-5" src={ClockIcon} alt="" />
            <span>{recipe.tiempoMin} min</span>
          </span>

          <span aria-hidden="true">•</span>

          <span className="inline-flex items-center gap-2">
            <img className="h-5 w-5" src={MealIcon} alt="" />
            <span>{recipe.porciones} porciones</span>
          </span>
        </div>
      </div>
      {/*INGREDIENTES*/}
      <div className="px-4">{recipe.descripcion}</div>

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
              Ponemos agua en una cacerola, cuando rompa el hervor agregamos sal
              a gusto y los fideos… agregamos la panceta cortada en cubitos.
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
              Ponemos agua en una cacerola, cuando rompa el hervor agregamos sal
              a gusto y los fideos… agregamos la panceta cortada en cubitos.
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
              Ponemos agua en una cacerola, cuando rompa el hervor agregamos sal
              a gusto y los fideos… agregamos la panceta cortada en cubitos.
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
        <button
          type="button"
          className="flex-1 bg-primary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px]"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Borrar Receta
        </button>{" "}
        <LinkButton to={"edit"} variant="tertiary" className="w-full">
          Editar receta
        </LinkButton>
      </div>
      {modalOpen && (
        <Modal
          title="Borrar esta receta?"
          description="Se borrara de tu biblioteca"
          confirmLabel="Borrar receta"
          cancelLabel="Cancelar"
          onClose={() => {
            setModalOpen(false);
          }}
          onConfirm={() => {
            submit(null, { method: "DELETE" });
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
