import CameraIcon from "../assets/icons/icon-camera.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";

export default function StepItem({
  index = 0,
  value = "",
  photos = [], // [{ id, preview }]
  maxPhotos = 3,
  onChange, // (index, text)
  onRemove, // (index)
  onPickPhotos, // (index, FileList)
  onRemovePhoto, // (index, photoId)
}) {
  const canAdd = photos.length < maxPhotos;
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
              <img className="size-8" src={RemoveIcon} alt="" />
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
            {/* Miniaturas a la izquierda */}
            {photos.map((p) => (
              <div key={p.id} className="relative">
                <img
                  src={p.preview}
                  alt="Vista previa"
                  className="h-24  w-24  object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(index, p.id)}
                  className="absolute -top-2 -right-2 bg-white border rounded-full p-0.5"
                  title="Quitar foto"
                >
                  <img className="size-4" src={RemoveIcon} alt="Quitar" />
                </button>
              </div>
            ))}

            {/* Label detrás de las miniaturas; desaparece al llegar al máximo */}
            {canAdd && (
              <>
                <label
                  htmlFor={inputId}
                  className="flex gap-4 items-center cursor-pointer select-none"
                  title="Agregar foto"
                >
                  <img src={CameraIcon} alt="" />
                  <p>Agregar foto</p>
                </label>
                <input
                  id={inputId}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => onPickPhotos(index, e.target.files)}
                  name="stepPhotos[]"
                />
              </>
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
