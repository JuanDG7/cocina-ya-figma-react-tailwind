// src/components/RecipeCard.jsx
import { Link } from "react-router-dom";

import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";

export default function RecipeCard({ meal }) {
  return (
    <>
      <Link
        to={`/recipes/${meal.id}`}
        className="flex flex-col items-center gap-2  w-full"
      >
        {/*CARDD*/}
        <div
          className="h-[250px] w-[210px] px-2 rounded-2xl border border-black/5 bg-white flex flex-col items-start pt-2  shadow-[0_0_6px_rgba(0,0,0,0.14)]
"
        >
          <img
            src={meal.img}
            alt={meal.title}
            className="h-full object-cover rounded-2xl "
          />
          <div className="">
            {" "}
            <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
              {meal.title}
            </h1>
            <div className="flex flex-row  mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3 ">
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
            </div>{" "}
          </div>
        </div>
      </Link>
    </>
  );
}
