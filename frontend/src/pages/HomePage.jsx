import logoWebp from "../assets/logo-cocinaya.webp";
import logoPng from "../assets/logo-cocinaya.png";
import SearchIcon from "../assets/icons/icon-search.svg";
import UserIcon from "../assets/icons/icon-user.svg";
import CategoriesSection from "../components/CategoriesSection";
import PopularRecipesSection from "../components/PopularRecipesSection";

export default function HomePage() {
  return (
    <>
      <div>
        {/* HEADER  */}
        <header className=" pt-10 pr-4 pb-4 pl-4 bg-[url(/img/background.svg)] rounded-b-2xl bg-cover bg-center">
          {/*  logo + ICON-USER.SVG */}
          <div className="flex items-center justify-between ">
            <picture>
              <source srcSet={logoWebp} />
              <img
                className="w-[145px]"
                src={logoPng}
                alt="Logo de CocinaYa"
                loading="eager"
                decoding="async"
              />
            </picture>
            <button aria-label="Perfil" className="">
              <img src={UserIcon} alt="" className="size-5 mt-2" />
            </button>
          </div>

          {/* buscador */}
          <div className="mt-3 relative">
            {" "}
            <input
              type="search"
              placeholder="Buscar recetas !"
              className="input rounded-xl pl-12"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 ">
              <img src={SearchIcon} alt="" className="size-5" />
            </span>
          </div>
        </header>

        {/* CONTENIDO (luego lo llenamos) */}
        <section className="mt-5">
          {/* Categorías */}
          <CategoriesSection>Categorias</CategoriesSection>
        </section>
        <section className="mt-5">
          {/* Populares */}{" "}
          <PopularRecipesSection>Recetas Populares</PopularRecipesSection>{" "}
        </section>
      </div>
    </>
  );
}
