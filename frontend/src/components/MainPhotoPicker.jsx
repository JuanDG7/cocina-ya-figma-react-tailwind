import { useState, useEffect } from "react";
import CameraIcon from "../assets/icons/icon-camera.svg";

export default function MainPhotoPicker({ existingImage }) {
  const [preview, setPreview] = useState(
    existingImage ? `http://localhost:8080/${existingImage}` : null
  );

  // 📂 Cuando el usuario elige un nuevo archivo
  const handleChange = (events) => {
    const file = events.target.files?.[0];
    if (!file) return;

    // Limpia el blob anterior y genera uno nuevo
    setPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev); //libera memoria, libera el blop ocupado por el file
      return URL.createObjectURL(file);
    });
  };

  // 🧹 Limpieza de blobs cuando cambia o se desmonta el componente
  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-[95%] relative m-4 mt-10">
      {/* tarjeta visual */}
      <div className="flex flex-col items-center justify-center bg-gray-200 rounded-2xl gap-2 h-56">
        {preview ? (
          <img
            src={preview}
            alt="Vista previa"
            className="w-full h-full object-cover rounded-2xl"
          />
        ) : (
          <>
            <img className="size-16" src={CameraIcon} alt="" />
            <h2 className="font-worksans text-[14px] leading-3.5 font-[400] text-oscuro">
              Añadí una foto de tu plato
            </h2>
          </>
        )}
      </div>

      {/* 🧩 input hidden que conserva la imagen actual */}
      {existingImage && (
        <input type="hidden" name="imageUrl" value={existingImage} />
      )}

      {/* input que cubre TODA la tarjeta */}
      <input
        id="mainPhoto"
        key="main-photo"
        name="mainPhoto"
        type="file"
        accept="image/*"
        onClick={(e) => (e.currentTarget.value = null)} // limpiar ANTES del diálogo POR SI EL USUARIO SELECCIONA 2 VCS EL MISMO ARCHIVO, si esto ONCHANGE NO DISPARA SI ES EL MISMO FILE
        onChange={handleChange}
        className="absolute inset-0 opacity-0 cursor-pointer"
        style={{ WebkitAppearance: "none" }} //esta linea no importa pq el input esta invisible con opacity-0
        appearance="none" //esta linea no importa pq el input esta invisible con opacity-0
      />
    </div>
  );
}
