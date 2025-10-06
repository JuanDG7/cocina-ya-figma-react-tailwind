import { useState, useEffect, useRef } from "react";
import CameraIcon from "../assets/icons/icon-camera.svg";
import RemoveIcon from "../assets/icons/icon-remove.svg";
import MovileNavIcon from "../assets/icons/icon-movile-nav.svg";

export default function StepItem({ index = 0 }) {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // máx 3
  const [previews, setPreviews] = useState([]); // blob: URLs
  const fileInputRef = useRef(null);

  const handleFiles = (e) => {
    const selected = Array.from(e.target.files || []);
    const combined = [...files, ...selected].slice(0, 3);
    // liberar previas
    previews.forEach((u) => URL.revokeObjectURL(u));
    setFiles(combined);
    setPreviews(combined.map((f) => URL.createObjectURL(f)));
    e.target.value = "";
  };

  useEffect(() => {
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
  }, [previews]);

  return (
    <div className="flex flex-col border border-gray-300 p-4 rounded-md">
      {/* fila 1 (SIN CAMBIOS) */}
      <div className="flex items-center gap-4 w-full rounded-xl ">
        <span>{index + 1}</span>
        <div className="flex items-center w-full  ">
          <input
            type="text"
            placeholder="Ej: Pon la mezcla en un molde"
            className="flex-1   placeholder-gray-400 "
            name="pasos[]"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="button" className="text-rose-700 ">
            <img className="size-8" src={MovileNavIcon} alt="" />
          </button>
        </div>
      </div>

      {/* fila 2 (SIN CAMBIOS) */}
      <div className="flex items-center gap-4 w-full rounded-xl h-7 ">
        <span className="invisible">1 </span>
        <div className="flex items-center w-full border-b-1"></div>
      </div>

      {/* previews (AGREGADO, no toca tus filas existentes) */}
      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Paso ${index + 1} - foto ${i + 1}`}
              className="w-full h-24 object-cover rounded-md"
            />
          ))}
        </div>
      )}

      {/* fila 3 (SIN CAMBIOS visibles) */}
      <div
        className="flex items-center gap-4 w-full rounded-xl "
        onClick={() => fileInputRef.current?.click()}
      >
        <span className="invisible">1</span>
        <div className=" flex gap-4 ">
          <img src={CameraIcon} alt="" />
          <p>Agregar foto</p>
        </div>
        <button className="text-rose-700 ml-auto ">
          <img className="size-8" src={RemoveIcon} alt="" />
        </button>
      </div>

      {/* input oculto para no alterar tu layout */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFiles}
        className="sr-only"
        name={`pasoFotos_${index}[]`}
      />
    </div>
  );
}
