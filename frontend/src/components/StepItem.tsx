import CameraIcon from "../assets/icons/icon-camera.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";

type StepItemProps = {
  index: number;
  stepId: string;
  value: string;
  photo: { file: File | null; preview: string } | null;
  onChange: (index: number, text: string) => void;
  onRemove: (index: number) => void;
  onPickPhoto: (stepIndex: number, file: File | null) => void;
  onRemovePhoto: (stepIndex: number) => void;
};

export default function StepItem({
  index,
  stepId,
  value = "",
  photo = null,
  onChange,
  onRemove,
  onPickPhoto,
  onRemovePhoto,
}: StepItemProps) {
  const inputId = `photo-${index}`;

  return (
    <div className="flex flex-col space-y-2 mx-auto">
      <div className="flex flex-col border border-gray-300 p-4 rounded-md">
        {/* 🧾 FILA: texto + eliminar */}
        <div className="flex items-center gap-4 w-full rounded-xl">
          <span>{index + 1}</span>
          <div className="flex items-center w-full">
            <input
              type="text"
              value={value || ""}
              onChange={(e) => onChange(index, e.target.value)}
              placeholder="Ej: Batir los huevos"
              className="flex-1 placeholder-gray-400 focus:outline-none focus:ring-0"
              name="stepText[]"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-rose-700"
              aria-label="Eliminar paso"
            >
              <img className="size-8" src={RemoveIcon} alt="Eliminar paso" />
            </button>
          </div>
        </div>

        {/* Separador */}
        <div className="flex items-center gap-4 w-full rounded-xl h-7">
          <span className="invisible">1 </span>
          <div className="flex items-center w-full border-b"></div>
        </div>

        {/* 🖼️ Fila de foto */}
        <div className="flex items-center gap-4 w-full rounded-xl">
          <span className="invisible">1</span>

          <div className="flex gap-4 items-center flex-wrap">
            {/* ID único del paso */}
            <input type="hidden" name="photoId[]" value={stepId} />

            {/* Imagen vieja (por si no se reemplaza) */}
            <input
              type="hidden"
              name="existingStepPhotos[]"
              value={
                photo?.preview?.startsWith("blob:")
                  ? ""
                  : photo?.preview.replace("http://localhost:8080/", "")
              }
            />

            {/* Archivo nuevo */}
            <input
              id={inputId}
              type="file"
              accept="image/*"
              className="hidden"
              onClick={(e) => ((e.target as HTMLInputElement).value = "")}
              onChange={(e) => onPickPhoto(index, e.target.files?.[0] || null)}
              name="stepPhotos[]" // coincide con multer
            />
            <input
              type="hidden"
              name="hasNewPhoto[]"
              value={photo?.file ? "true" : "false"}
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

          {/* Icono decorativo */}
          <button type="button" className="text-rose-700 ml-auto" title="Mover">
            <img className="size-10" src={MovileNavIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
