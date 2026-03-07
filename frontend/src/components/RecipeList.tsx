import LinkButton from "./LinkButton";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";
import { type Recipe } from "../types/recipe";
import { Link } from "react-router-dom";

type RecipeListProps = {
  recipes: Recipe[];
};

export default function RecipeList({ recipes }: RecipeListProps) {
  return (
    <ul className="grid gap-4 grid-cols-1 md:grid-cols-1 lg:grid-cols-1 px-4 md:px-6">
      {recipes.map((recipe) => (
        <li key={recipe._id} className="w-full">
          <Link
            to={recipe._id}
            className="w-full p-5 sm:p-4 lg:p-3 rounded-2xl border border-black/5  bg-white flex flex-col items-center shadow-[0_0_6px_rgba(0,0,0,0.01)] sm:flex-row sm:items-start sm:gap-6 "
          >
            {/*CARDD*/}
            <div className="w-full aspect-[4/3] overflow-hidden rounded-xl sm:w-60 sm:h-44 sm:aspect-auto sm:flex-shrink-0 lg:w-72 lg:h-48">
              <img
                src={`http://localhost:8080/${recipe.imageUrl}`}
                alt={recipe.titulo}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            {/* INFORMACION DE LA RECETA */}
            <div className="self-start mb-10 sm:mb-0 md:flex-1 md:mb-0  min-w-0">
              {" "}
              <h1 className="text-[18px] leading-[22px] sm:text-[22px] sm:leading-[26px] lg:text-[24px] text-oscuro font-semibold mt-2 md:mt-0">
                {recipe.titulo}
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-[15px] text-gray-600 line-clamp-2 break-words min-h-[2.5rem] sm:min-h-[2.5rem]">
                {recipe.descripcion}
              </p>
              <div className="flex gap-3 mt-2 sm:mt-3 text-[12px] leading-[12px] sm:text-[15px] sm:leading-[18px] lg:text-[16px] font-normal text-oscuro font-worksans items-center">
                <span className="inline-flex items-center gap-1">
                  {" "}
                  <img className="size-4" src={FireIcon} alt="" />
                  {recipe.calorias}
                </span>{" "}
                <span className="mx-1">•</span>
                <span className="inline-flex items-center  gap-1 ">
                  {" "}
                  <img
                    className="size-4 sm:size-5 lg:size-6"
                    src={ClockIcon}
                    alt=""
                  />
                  {recipe.tiempoMin}
                </span>
                <span className="mx-1">•</span>
                <span className="inline-flex items-center gap-1">
                  <img src={MealIcon} alt="" />
                  <span>{recipe.porciones}</span>
                </span>
              </div>{" "}
              {/* <div>Created bv {recipe.creator.email ?? "-"}</div> */}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
