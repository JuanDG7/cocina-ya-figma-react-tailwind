import CameraIcon from "../assets/icons/icon-camera.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";

export default function StepItem({
  index,
  stepId,
  value = "",
  photo = null,

  onChange, // (index, text)
  onRemove, // (index)
  onPickPhoto, // (index, FileList)
  onRemovePhoto, // (index, photoId)
}) {
  const inputId = `photo-${index}`;

  return (
    <div className="flex flex-col space-y-2 mx-auto ">
      <div className="flex flex-col border border-gray-300 p-4 rounded-md">
        {/* FILA: texto + eliminar (igual layout) */}
        <div className="flex items-center gap-4 w-full rounded-xl ">
          <span>{index + 1}</span>
          <div className="flex items-center w-full  ">
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder="Ej: Pon la mezcla en un molde"
              className="flex-1   placeholder-gray-400 focus:outline-none focus:ring-0"
              name="stepText[]"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-rose-700 "
              aria-label="Eliminar paso"
            >
              <img className="size-8" src={RemoveIcon} alt="Eliminar paso" />
            </button>
          </div>
        </div>

        {/* SEPARADOR (usa border-b, no border-b-1) */}
        <div className="flex items-center gap-4 w-full rounded-xl h-7 ">
          <span className="invisible">1 </span>
          <div className="flex items-center w-full border-b"></div>
        </div>

        {/* FILA: miniaturas + "Agregar foto" que se corre a la derecha */}
        <div className="flex items-center gap-4 w-full rounded-xl ">
          <span className="invisible">1</span>

          <div className=" flex gap-4 items-center flex-wrap ">
            {/* SIEMPRE montados (se envían siempre) */}
            <input type="hidden" name="photoId[]" value={stepId} />
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(e) => (e.target.value = "")}
              onChange={(e) => onPickPhoto(index, e.target.files[0])}
              name="stepPhotos[]" /* ← debe coincidir con Multer */
            />

            {photo ? (
              <div className="relative">
                <img
                  src={photo.preview}
                  alt="Vista previa"
                  className="h-24 w-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(index)}
                  className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5"
                >
                  <img className="size-4" src={RemoveIcon} alt="Quitar" />
                </button>

                {/* Reemplazar usando el MISMO input montado */}
                <label
                  htmlFor={inputId}
                  className="ml-3 cursor-pointer select-none"
                  title="Cambiar foto"
                >
                  Cambiar foto
                </label>
              </div>
            ) : (
              <label
                htmlFor={inputId}
                className="flex gap-4 items-center cursor-pointer select-none"
                title="Agregar foto"
              >
                <img src={CameraIcon} alt="" />
                <p>Agregar foto</p>
              </label>
            )}
          </div>

          {/* Handle reordenar (misma posición) */}
          <button
            type="button"
            className="text-rose-700 ml-auto "
            title="Reordenar"
          >
            <img className="size-10" src={MovileNavIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
