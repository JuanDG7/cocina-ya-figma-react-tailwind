import { useState } from "react";

import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";

type Ingredient = { name: string; amount: string };

type initialIngredientsProps = {
  initialIngredients?: Ingredient[];
  fieldErrors?: Record<string, string>;
};

export default function IngredientList({
  initialIngredients = [],
  fieldErrors,
}: initialIngredientsProps) {
  const [ingredientes, setIngredients] = useState<Ingredient[]>(
    initialIngredients.length > 0
      ? initialIngredients
      : [{ name: "", amount: "" }]
  );

  function handleChange(index: number, field: keyof Ingredient, value: string) {
    setIngredients((prevIng) => {
      const copy = [...prevIng];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function addIngredient() {
    setIngredients((prev) => [...prev, { name: "", amount: "" }]);
  }

  function removeIngredient(index: number) {
    setIngredients((prev) => prev.filter((_, ind) => ind !== index));
  }

  return (
    <div className="w-[95%] flex flex-col">
      <h2 className="mb-3">Ingredientes</h2>

      {ingredientes.map((ing, index) => {
        return (
          <div key={index} className="w-full flex flex-col gap-1 mb-2">
            {/* FILA PRINCIPAL (inputs + iconos) */}
            <div className="flex flex-row gap-3 items-center">
              <div className="flex-1">
                <input
                  className="input w-full"
                  type="text"
                  placeholder="huevo"
                  name="ingredientsName[]"
                  value={ing.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
              </div>

              <div className="flex-1">
                <input
                  className="input w-full truncate"
                  type="text"
                  placeholder="2 unidades"
                  name="ingredientsAmount[]"
                  value={ing.amount}
                  onChange={(e) =>
                    handleChange(index, "amount", e.target.value)
                  }
                />
              </div>

              <img className="size-12 shrink-0" src={MovileNavIcon} alt="" />

              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="shrink-0"
              >
                <img className="size-10" src={RemoveIcon} alt="" />
              </button>
            </div>

            {/* FILA DE ERRORES */}
            <div className="flex flex-row gap-3">
              <div className="flex-1">
                <p className="text-red-500 text-sm min-h-[20px]">
                  {fieldErrors?.[`ingredientsName.${index}`] ?? ""}
                </p>
              </div>

              <div className="flex-1">
                <p className="text-red-500 text-sm min-h-[20px]">
                  {fieldErrors?.[`ingredientsAmount.${index}`] ?? ""}
                </p>
              </div>

              {/* espacio para que coincida con iconos */}
              <div className="w-[112px]" />
            </div>
          </div>
        );
      })}

      <button
        type="button"
        className="flex px-5 mt-5 ml-auto bg-secondary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px] w-max"
        onClick={addIngredient}
      >
        + Agregar ingrediente
      </button>
    </div>
  );
}
