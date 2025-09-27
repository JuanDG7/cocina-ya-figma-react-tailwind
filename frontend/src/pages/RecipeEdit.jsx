import { useNavigate } from "react-router-dom";

import LinkButton from "../components/LinkButton";

import HeartOutlineIcon from "../assets/icons/icon-heart-outline.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import CameraIcon from "../assets/icons/icon-camera.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";

export default function EditRecipePage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Frame  */}
      <div className="">
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
              <h1 className="text-[34px] font-semibold">Crear Receta</h1>
              <img className="size-8" src={HeartOutlineIcon} alt="" />
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>
        <section className="px-4  ">
          <div className="">
            {/* FORMULARIO*/}
            <form action="">
              {" "}
              <div className="flex flex-col gap-y-8 justify-center items-center w-full border border-black/20 rounded-2xl overflow-hidden  shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
                {/*Card + AÑADI UNA FOTO DE TU PLATO + ICONO CORAZON*/}
                <div className="w-[95%]  flex flex-col items-center justify-center py-15 m-4 mt-10 bg-gray-200 rounded-2xl gap-2  ">
                  <img className="size-16" src={CameraIcon} alt="" />
                  <h2 className="font-worksans text-[14px] leading-3.5 font-[400] text-oscuro">
                    Añadi una foto de tu plato
                  </h2>
                </div>
                {/* INPUT TITULO*/}
                <div className="w-[95%] ">
                  <label className="label " htmlFor="titulo">
                    Titulo
                  </label>
                  <input
                    type="text"
                    name="titulo"
                    id="titulo"
                    placeholder="Milanesa a la napolitana"
                    className=" input "
                  />
                </div>
                {/* Descripcion:Opcional*/}
                <div className="w-[95%] ">
                  <label className="label" htmlFor="descripcion">
                    Descripcion:Opcional
                  </label>
                  <textarea
                    type="textarea"
                    name="descripcion"
                    id="descripcion"
                    placeholder="Contanos un poco sobre tu receta"
                    className="input min-h-[150px]"
                  />
                </div>
                {/*Categoria*/}
                <fieldset className="w-[95%]">
                  <legend className="label">Categoría</legend>
                  <div className="flex flex-wrap gap-2">
                    {["Salado", "Dulce", "Postre", "Caldos", "Variados"].map(
                      (v) => {
                        const id = `cat-${v.toLowerCase()}`;
                        return (
                          <div key={id}>
                            <input
                              id={id}
                              name="categoria"
                              type="radio"
                              value={v.toLowerCase()}
                              className="peer sr-only"
                              required
                            />
                            <label
                              htmlFor={id}
                              className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
                       text-[14px] cursor-pointer select-none
                       hover:border-black/30
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                       peer-checked:border-transparent peer-checked:bg-oscuro peer-checked:text-white"
                            >
                              {v}
                            </label>
                          </div>
                        );
                      }
                    )}
                  </div>
                </fieldset>
                {/* INGREDIENTES*/}
                <div className="w-[95%] flex flex-col  ">
                  <h2>Ingredientes</h2>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <input className="input" type="text" placeholder="huevo" />
                    <input
                      className="input w-1/2 truncate"
                      type="text"
                      placeholder="2 unidades"
                    />
                    <img className="size-15" src={MovileNavIcon} alt="" />
                    <img className="size-8" src={RemoveIcon} alt="" />
                  </div>
                  <div className="flex flex-row gap-3 items-center justify-center">
                    <input className="input" type="text" placeholder="huevo" />
                    <input
                      className="input w-1/2 truncate "
                      type="text"
                      placeholder="325 gramos"
                    />
                    <img className="size-15" src={MovileNavIcon} alt="" />
                    <img className="size-8" src={RemoveIcon} alt="" />
                  </div>
                  {/*                                           AGREGAR INGREDIENTES */}{" "}
                  <button
                    type="button"
                    className="flex px-5 mt-5 ml-auto bg-secondary py-[12px]  text-white rounded-full font-worksans font-[500] text-[16px]
                    w-max
                    "
                  >
                    + Agregar ingrediente
                  </button>
                </div>
                <div className=" w-[95%] flex flex-col space-y-2 ">
                  <h2>Pasos para preparar</h2>
                  {/*PON LA MEZCLA EN UN MOLDE */}
                  {/*AGREGAR FOTO */}

                  <div className="flex flex-col border border-gray-300 p-4 rounded-md">
                    {" "}
                    <div class="flex items-center gap-4 w-full rounded-xl ">
                      <span>1</span>
                      <div className="flex items-center w-full  ">
                        <input
                          type="text"
                          placeholder="Ej: Pon la mezcla en un molde"
                          class="flex-1   placeholder-gray-400 "
                        />

                        <button className="text-rose-700 ">
                          <img className="size-8" src={RemoveIcon} alt="" />
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center gap-4 w-full rounded-xl h-7 ">
                      <span className="invisible">1 </span>
                      <div className="flex items-center w-full border-b-1"></div>
                    </div>
                    <div class="flex items-center gap-4 w-full rounded-xl ">
                      <span className="invisible">1</span>
                      <div className=" flex gap-4 ">
                        <img src={CameraIcon} alt="" />
                        <p>Agregar foto</p>
                      </div>
                      <button className="text-rose-700 ml-auto ">
                        <img className="size-8" src={RemoveIcon} alt="" />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col border border-gray-300 p-4 rounded-md ">
                    {" "}
                    <div class="flex items-center gap-4 w-full rounded-xl ">
                      <span>1</span>
                      <div className="flex items-center w-full  ">
                        <input
                          type="text"
                          placeholder="Ej: Pon la mezcla en un molde"
                          class="flex-1   placeholder-gray-400 "
                        />

                        <button className="text-rose-700 ">
                          <img className="size-8" src={RemoveIcon} alt="" />
                        </button>
                      </div>
                    </div>
                    <div class="flex items-center gap-4 w-full rounded-xl h-7 ">
                      <span className="invisible">1 </span>
                      <div className="flex items-center w-full border-b-1"></div>
                    </div>
                    <div class="flex items-center gap-4 w-full rounded-xl ">
                      <span className="invisible">1</span>
                      <div className=" flex gap-4 ">
                        <img src={CameraIcon} alt="" />
                        <p>Agregar foto</p>
                      </div>
                      <button className="text-rose-700 ml-auto ">
                        <img className="size-8" src={RemoveIcon} alt="" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-[95%] space-y-5 pb-10">
                  {" "}
                  <label className="self-start font-worksans text-oscuro text-[16px] font-[500] block mb-[2px]">
                    {" "}
                    Consejos extra
                  </label>
                  <input
                    type="text"
                    className=" border p-5 w-full  rounded-sm h-[45px] bg-white text-oscuro placeholder:text-grisclaro/80  text-[14px] font-worksans font-[400]"
                    placeholder="2 unidades"
                  />
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      className="flex-1 bg-primary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px]"
                    >
                      Borrar receta
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-secondary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px]"
                    >
                      Modificar receta
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
