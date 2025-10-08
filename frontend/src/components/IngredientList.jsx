import { useState } from "react";

import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";

export function IngredientList() {
  const [ingredientes, setIngredients] = useState([{ name: "", amount: "" }]);

  function handleChange(index, field, value) {
    setIngredients((prevIng) => {
      const copy = [...prevIng];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  }

  function addIngredient() {
    setIngredients((prev) => {
      const copy = [...prev, { name: "", amount: "" }];
      return copy;
    });
  }

  function removeIngredient(index) {
    setIngredients((prev) => prev.filter((ing, ind) => ind !== index));
  }
  return (
    <div className="w-[95%] flex flex-col  ">
      <h2>Ingredientes</h2>
      {/* INPUTS DE INGREDIENTERS */}
      {ingredientes.map((ing, index) => {
        return (
          <div
            key={index}
            className="flex flex-row gap-3 items-center justify-center"
          >
            <input
              className="input"
              type="text"
              placeholder="huevo"
              name="ingredientsName[]"
              value={ing.name}
              onChange={(e) => {
                handleChange(index, "name", e.target.value);
              }}
            />
            <input
              className="input w-1/2 truncate"
              type="text"
              placeholder="2 unidades"
              name="ingredientsAmount[]"
              value={ing.amount}
              onChange={(e) => {
                handleChange(index, "amount", e.target.value);
              }}
            />
            <img className="size-12" src={MovileNavIcon} alt="" />
            <button type="button" onClick={() => removeIngredient(index)}>
              <img className="size-16" src={RemoveIcon} alt="" />
            </button>
          </div>
        );
      })}
      {/*     BOTON  AGREGAR INGREDIENTES */}{" "}
      <button
        type="button"
        className="flex px-5 mt-5 ml-auto bg-secondary py-[12px]  text-white rounded-full font-worksans font-[500] text-[16px]
                      w-max
                      "
        onClick={addIngredient}
      >
        + Agregar ingrediente
      </button>
    </div>
  );
}
