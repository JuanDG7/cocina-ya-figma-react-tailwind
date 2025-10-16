import LinkButton from "../components/LinkButton";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";

export default function RecipeList({ recipes }) {
  return (
    <ul className="flex flex-col  items-center gap-2  ">
      {recipes.map((recipe) => (
        <li
          key={recipe._id}
          className=" w-[95%] p-5  rounded-2xl border border-black/5 bg-white flex flex-col items-center   shadow-[0_0_6px_rgba(0,0,0,0.14)]
          "
        >
          {/*CARDD*/}
          <img
            src={`http://localhost:8080/${recipe.imageUrl}`}
            alt={recipe.titulo}
            className="w-full object-cover rounded-2xl "
          />
          {/* INFORMACION DE LA RECETA */}
          <div className="self-start mb-10">
            {" "}
            <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
              {recipe.titulo}
            </h1>
            <div className="flex flex-row justify-between mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3">
              <span className="inline-flex items-center gap-1">
                {" "}
                <img className="size-4" src={FireIcon} alt="" />
                {recipe.calorias}
              </span>{" "}
              <span className="mx-1">•</span>
              <span className="inline-flex items-center  gap-1 ">
                {" "}
                <img className="size-4" src={ClockIcon} alt="" />
                {recipe.tiempoMin}
              </span>
              <span className="mx-1">•</span>
              <span className="inline-flex items-center gap-1">
                <img src={MealIcon} alt="" />
                <span>{recipe.porciones}</span>
              </span>
            </div>{" "}
          </div>
          {/* BOTONES */}
          <div className="mt-1 grid w-full grid-cols-2 gap-3">
            <LinkButton to={recipe._id} variant="primary" className="w-full">
              Visualizar
            </LinkButton>
          </div>
        </li>
      ))}
    </ul>
  );
}
