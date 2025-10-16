import { useSubmit, useNavigation } from "react-router-dom";
import { useState } from "react";
import Modal from "./Modal";

import LinkButton from "./LinkButton";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";

export default function RecipeItem({ recipe }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col p-4 w-[90%] max-w-screen-lg mx-auto gap-y-8  items-start border border-black/20 rounded-2xl   shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
      <img
        className="object-cover rounded-xl  "
        src={`http://localhost:8080/${recipe.imageUrl}`}
        alt=""
      />
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

      <ul className="my-2 px-6 space-y-3 text-[16px] list-disc list-inside w-full ">
        {recipe.ingredients.map((ingredientes) => {
          return (
            <li
              key={ingredientes._id}
              className=" marker:text-primary pb-2 border-b border-dashed border-primary"
            >
              {ingredientes.name} {ingredientes.amount}
            </li>
          );
        })}
      </ul>

      <h2 className="px-4 pt-6 text-[18px] font-medium">Pasos</h2>

      <ol className="mt-4 mb-10 space-y-6 px-4">
        {recipe.steps.map((step, i) => (
          <li key={step._id} className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-white font-semibold">
              {i + 1}
            </span>
            <div className="flex flex-col gap-3">
              <p className="text-[16px] leading-[24px]">{step.text}</p>
              <div className="flex gap-3">
                <img
                  src={`http://localhost:8080/${step.photos[0]}`}
                  alt="Ingredientes ajo, cebolla y panceta"
                  className="h-28 w-28 rounded-lg object-cover"
                />
              </div>
            </div>
          </li>
        ))}
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
          isSubmitting={isSubmitting}
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
