import CameraIcon from "../assets/icons/icon-camera.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";

export default function StepItem() {
  return (
    <div className=" w-[95%] flex flex-col space-y-2 ">
      <h2>Pasos para preparar</h2>
      {/*PON LA MEZCLA EN UN MOLDE */}
      {/*AGREGAR FOTO */}

      <div className="flex flex-col border border-gray-300 p-4 rounded-md">
        {" "}
        <div className="flex items-center gap-4 w-full rounded-xl ">
          <span>1</span>
          <div className="flex items-center w-full  ">
            <input
              type="text"
              placeholder="Ej: Pon la mezcla en un molde"
              className="flex-1   placeholder-gray-400 focus:outline-none"
            />

            <button type="button" className="text-rose-700 ">
              <img className="size-8" src={RemoveIcon} alt="" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full rounded-xl h-7 ">
          <span className="invisible">1 </span>
          <div className="flex items-center w-full border-b-1"></div>
        </div>
        <div className="flex items-center gap-4 w-full rounded-xl ">
          <span className="invisible">1</span>
          <div className=" flex gap-4 ">
            <img src={CameraIcon} alt="" />
            <p>Agregar foto</p>
          </div>
          <button type="button" className="text-rose-700 ml-auto ">
            <img className="size-10" src={MovileNavIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
