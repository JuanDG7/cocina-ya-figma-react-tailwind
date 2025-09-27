import { useNavigate, Link, useLoaderData } from "react-router-dom";

import LinkButton from "../components/LinkButton";

import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import EditIcon from "../assets/icons/icon-edit-document.svg";
import FireIcon from "../assets/icons/icon-fire.svg";
import ClockIcon from "../assets/icons/icon-clock.svg";
import MealIcon from "../assets/icons/icon-meal.svg";

// Dummy data; replace with your real items
const sample = [
  {
    id: "pasta-alfredo",
    title: "Pasta Alfredo cremosa",
    img: "/img/recipes/carbonara3x.webp",
    calorias: "152 kcal",
    time: "25 min",
    rating: 4.7,
  },
  {
    id: "burger",
    title: "Hamburguesa casera",
    img: "/img/recipes/gyozas.webp",
    calorias: "750 kcal",
    time: "18 min",
    rating: 4.5,
  },
  {
    id: "ramen",
    title: "Ramen express",
    img: "/img/recipes/pizza-pepperoni.webp",
    calorias: "1205 kcal",
    time: "30 min",
    rating: 4.6,
  },
];

// export default function Recipes() {
//   const navigate = useNavigate();
//   return (
//     <>
//       <div>
//         {/*  Header del top*/}
//         <header className=" pt-10 pr-4 pb-4 pl-4 mb-8 bg-[url(/img/background.svg)] rounded-b-2xl bg-cover bg-center">
//           <div className=" flex justify-between items-center">
//             <button
//               className="h-11 w-11 flex items-center justify-center "
//               onClick={() => navigate(-1)}
//             >
//               {/*FLECHITA A LA IZQUIERDA*/}
//               <img className="h-[24px] w-[24px]" src={IconLeftArrow} alt="" />
//             </button>
//             {/*TITULO Y CORAZON */}
//             <div className="flex items-center gap-2">
//               <h1 className="text-[34px] font-semibold">Todas las recetas</h1>
//               <img className="size-8" src={EditIcon} alt="" />
//             </div>
//             {/* Spacer derecho del mismo ancho que el botón izquierdo */}
//             <div className="h-11 w-11" aria-hidden />{" "}
//           </div>
//         </header>

//         <ul className="flex flex-col  items-center gap-2  ">
//           {sample.map((meals) => (
//             <li
//               key={meals.id}
//               className=" w-[95%] p-5  rounded-2xl border border-black/5 bg-white flex flex-col items-center   shadow-[0_0_6px_rgba(0,0,0,0.14)]
//           "
//             >
//               {/*CARDD*/}
//               <img
//                 src={meals.img}
//                 alt={meals.title}
//                 className="w-full object-cover rounded-2xl "
//               />
//               {/* INFORMACION DE LA RECETA */}
//               <div className="self-start mb-10">
//                 {" "}
//                 <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
//                   {meals.title}
//                 </h1>
//                 <div className="flex flex-row justify-between mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3">
//                   <span className="inline-flex items-center gap-1">
//                     {" "}
//                     <img className="size-4" src={FireIcon} alt="" />
//                     {meals.calorias}
//                   </span>{" "}
//                   <span className="mx-1">•</span>
//                   <span className="inline-flex items-center  gap-1 ">
//                     {" "}
//                     <img className="size-4" src={ClockIcon} alt="" />
//                     {meals.time}
//                   </span>
//                   <span className="mx-1">•</span>
//                   <span className="inline-flex items-center gap-1">
//                     <img src={MealIcon} alt="" />
//                     <span>{meals.calorias}</span>
//                   </span>
//                 </div>{" "}
//               </div>
//               {/* BOTONES */}
//               <div className="mt-1 grid w-full grid-cols-2 gap-3">
//                 <LinkButton to={meals.id} variant="primary" className="w-full">
//                   Visualizar
//                 </LinkButton>
//                 <LinkButton
//                   to={`${meals.id}/edit`}
//                   variant="tertiary"
//                   className="w-full"
//                 >
//                   Editar receta
//                 </LinkButton>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </>
//   );
// }

export default function Recipes() {
  const navigate = useNavigate();
  const data = useLoaderData();
  return (
    <>
      <div>
        {data.title}
        {data.calorias}
        {data.tiempo}
        {data.porciones}
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
              <h1 className="text-[34px] font-semibold">Todas las recetas</h1>
              <img className="size-8" src={EditIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>

        <ul className="flex flex-col  items-center gap-2  ">
          {sample.map((meals) => (
            <li
              key={meals.id}
              className=" w-[95%] p-5  rounded-2xl border border-black/5 bg-white flex flex-col items-center   shadow-[0_0_6px_rgba(0,0,0,0.14)]
          "
            >
              {/*CARDD*/}
              <img
                src={meals.img}
                alt={meals.title}
                className="w-full object-cover rounded-2xl "
              />
              {/* INFORMACION DE LA RECETA */}
              <div className="self-start mb-10">
                {" "}
                <h1 className="text-[18px] leading-[22px] text-oscuro font-medium mt-2">
                  {meals.title}
                </h1>
                <div className="flex flex-row justify-between mt-2 text-[12px] leading-[12px] font-normal text-oscuro  font-worksans items-center pb-3">
                  <span className="inline-flex items-center gap-1">
                    {" "}
                    <img className="size-4" src={FireIcon} alt="" />
                    {meals.calorias}
                  </span>{" "}
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center  gap-1 ">
                    {" "}
                    <img className="size-4" src={ClockIcon} alt="" />
                    {meals.time}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="inline-flex items-center gap-1">
                    <img src={MealIcon} alt="" />
                    <span>{meals.calorias}</span>
                  </span>
                </div>{" "}
              </div>
              {/* BOTONES */}
              <div className="mt-1 grid w-full grid-cols-2 gap-3">
                <LinkButton to={meals.id} variant="primary" className="w-full">
                  Visualizar
                </LinkButton>
                <LinkButton
                  to={`${meals.id}/edit`}
                  variant="tertiary"
                  className="w-full"
                >
                  Editar receta
                </LinkButton>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export async function loader() {
  const response = await fetch("http://localhost:8080/feed/posts");

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Error en Recipes.jsx" }), {
      status: 500,
    });
  } else {
    const resData = await response.json();
    return resData;
  }
}
