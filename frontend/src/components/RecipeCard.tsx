// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import { type Recipe } from "../types/recipe";

type RecipeCardProps = {
  recipe: Recipe;
};

export default function RecipeCard({ recipe }: RecipeCardProps) {
  return (
    <>
      <Link
        to={`/recipes/${recipe._id}`}
        className="flex flex-col items-center gap-2"
      >
        {/*CARDD*/}
        <div
          className=" w-[210px] px-2 rounded-2xl border border-black/5 bg-white flex flex-col items-start pt-2  shadow-[0_0_6px_rgba(0,0,0,0.14)]
"
        >
          <img
            src={`http://localhost:8080/${recipe.imageUrl}`}
            alt={recipe.titulo}
            className="w-full h-[180px] object-cover rounded-2xl"
          />
          <div className="">
            {" "}
            <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
              {recipe.titulo}
            </h1>
            <div className="flex flex-row  mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3 ">
              <span className="inline-flex items-center gap-1">
                {" "}
                <img className="size-4" src={FireIcon} alt="" />
                {recipe.calorias} Kcal
              </span>{" "}
              <span className="mx-1">•</span>
              <span className="inline-flex items-center  gap-1 ">
                {" "}
                <img className="size-4" src={ClockIcon} alt="" />
                {recipe.tiempoMin} min
              </span>
            </div>{" "}
          </div>
        </div>
      </Link>
    </>
  );
}
