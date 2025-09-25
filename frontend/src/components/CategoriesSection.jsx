import { Link } from "react-router-dom";

// 📌 Import estático de las imágenes
import PastasImg from "../assets/categories/pastas.webp";
import HamburguesasImg from "../assets/categories/hamburguesas.webp";
import OrientalImg from "../assets/categories/oriental.webp";
import TacosImg from "../assets/categories/tacos.webp";
import BebidasImg from "../assets/categories/bebidas.webp";
import PostresImg from "../assets/categories/postres.webp";
import PizzasImg from "../assets/categories/pizzas.webp";
import SopasImg from "../assets/categories/sopas.webp";

// 📌 Array de categorías (Single Source of Truth)
const categories = [
  { name: "Pastas", img: PastasImg },
  { name: "Hamburguesas", img: HamburguesasImg },
  { name: "Comida Oriental", img: OrientalImg },
  { name: "Tacos", img: TacosImg },
  { name: "Bebidas", img: BebidasImg },
  { name: "Postres", img: PostresImg },
  { name: "Pizzas", img: PizzasImg },
  { name: "Sopas", img: SopasImg },
];

export default function CategoriesPage({ children }) {
  return (
    <section aria-labelledby="categories-heading" className="mt-6">
      {/* Header */}
      <div className="flex items-baseline justify-between px-4">
        <h2
          id="categories-heading"
          className="text-[24px] leading-[30px] font-semibold text-oscuro font-raleway"
        >
          {children}
        </h2>

        <Link
          to="/categories"
          aria-label="Ver todas las categorías"
          className="text-[20px] leading-[26x] font-medium text-primary"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
      <ul
        className="
          px-4 mt-3  flex flex-nowrap  gap-2 overflow-y-visible overflow-x-auto snap-x snap-mandatory pb-2 pt-2
           scroll-ps-4 scroll-pe-4  [overflow-clip-margin:14px] 
          touch-pan-x overscroll-x-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
          
        "
        aria-label="Listado de categorías"
      >
        {categories.map((cat) => (
          <li key={cat.name} className="snap-start   ">
            <Link
              to={`/categories/${cat.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex flex-col items-center gap-2  w-full"
            >
              {/*CARDD*/}
              <div
                className="h-[110px] w-[105px] rounded-2xl border border-black/5 bg-white flex flex-col items-center pt-2  shadow-[0_0_6px_rgba(0,0,0,0.14)]
"
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="h-[68px] w-[68px] object-scale-cover"
                />
                <span className="mt-2 text-[12px] leading-[12px] font-normal text-oscuro text-center font-worksans">
                  {cat.name}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
