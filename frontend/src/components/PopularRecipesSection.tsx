import RecipeCard from "./RecipeCard";

import { Link } from "react-router-dom";
import { type Recipe } from "../types/recipe";

//TODO mostrar las recetas que realmente estan en la base de datos y no placeholders de comida como ahora esta pasta alfredo cremosa , hamburguesa casera, ramen express
type Meal = {
  id: string;
  title: string;
  img: string;
  time: string;
  rating: number;
};

type PopularRecipesSectionProps = {
  children: React.ReactNode;
  viewAllTo?: string;
  recipes: Recipe[];
};
// Dummy data; replace with your real items
const sample: Meal[] = [
  {
    id: "pasta-alfredo",
    title: "Pasta Alfredo cremosa",
    img: "/img/recipes/carbonara-cremosa.webp",
    time: "25 min",
    rating: 4.7,
  },
  {
    id: "burger",
    title: "Hamburguesa casera",
    img: "/img/recipes/gyozas.webp",
    time: "18 min",
    rating: 4.5,
  },
  {
    id: "ramen",
    title: "Ramen express",
    img: "/img/recipes/pizza-pepperoni.webp",
    time: "30 min",
    rating: 4.6,
  },
];

export default function PopularRecipesSection({
  children,
  viewAllTo = "/popular",
  recipes,
}: PopularRecipesSectionProps) {
  return (
    <section aria-labelledby="popular-heading" className="mt-6">
      {/* Header */}
      <div className="flex items-baseline justify-between px-4">
        <h2
          id="popular-heading"
          className="text-[24px] leading-[30px] font-semibold font-raleway text-oscuro"
        >
          {children}
        </h2>
        <Link
          to={viewAllTo}
          className="text-[20px] leading-[26px] font-medium text-primary"
        >
          View All
        </Link>
      </div>
      {/* Row scroller (same pattern you already use) */}
      <ul
        className="
          px-4 mt-3  flex flex-nowrap  gap-2 overflow-y-visible overflow-x-auto snap-x snap-mandatory pb-2 pt-2
           scroll-ps-4 scroll-pe-4  [overflow-clip-margin:14px] 
          touch-pan-x overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:snap-none"
        aria-label="Listado de recetas populares"
      >
        {recipes.map((recipe) => (
          <li key={recipe._id} className="snap-start">
            <RecipeCard recipe={recipe} />
          </li>
        ))}
      </ul>
    </section>
  );
}
