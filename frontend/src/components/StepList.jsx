import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StepItem from "./StepItem";

export default function StepsList({ initialSteps = [] }) {
  const [steps, setSteps] = useState(
    initialSteps.length > 0
      ? initialSteps
      : [{ id: uuidv4(), text: "", photo: null }]
  );

  console.log(initialSteps);

  const allURLs = useRef(new Set());
  useEffect(() => {
    return () => {
      allURLs.current.forEach((u) => URL.revokeObjectURL(u));
      allURLs.current.clear();
    };
  }, []);

  // ➕ Agregar nuevo paso
  function addStep() {
    setSteps((prev) => [...prev, { id: uuidv4(), text: "", photo: null }]);
  }

  // ✏️ Cambiar texto del paso
  function changeText(index, text) {
    setSteps((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text };
      return copy;
    });
  }

  // 🗑️ Eliminar paso completo
  function removeStep(index) {
    setSteps((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      if (removed?.photo?.preview) {
        URL.revokeObjectURL(removed.photo.preview);
        allURLs.current.delete(removed.photo.preview);
      }
      // Aseguramos que siempre haya al menos un paso
      return copy.length ? copy : [{ id: uuidv4(), text: "", photo: null }];
    });
  }

  // 📸 Seleccionar una foto (solo una)
  function pickPhoto(stepIndex, file) {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    allURLs.current.add(preview);

    setSteps((prev) => {
      const copy = [...prev];
      copy[stepIndex] = { ...copy[stepIndex], photo: { file, preview } };
      return copy;
    });
  }

  // ❌ Quitar foto del paso
  function removePhoto(stepIndex) {
    setSteps((prev) => {
      const copy = [...prev];
      const step = copy[stepIndex];
      if (step.photo?.preview) {
        URL.revokeObjectURL(step.photo.preview);
        allURLs.current.delete(step.photo.preview);
      }
      copy[stepIndex] = { ...step, photo: null };
      return copy;
    });
  }

  return (
    <div className="flex flex-col items-center gap-4 w-[95%] ">
      <h2>Pasos para preparar</h2>

      {steps.map((s, i) => (
        <div key={s.id} className="w-full  ">
          <StepItem
            index={i}
            stepId={s.id}
            value={s.text}
            photo={s.photo}
            onChange={changeText}
            onRemove={removeStep}
            onPickPhoto={pickPhoto}
            onRemovePhoto={removePhoto}
          />
        </div>
      ))}

      {/* Botón inferior (CTA) */}
      <button
        type="button"
        onClick={addStep}
        className="flex-1 bg-secondary p-[12px] mt-5 ml-auto text-white rounded-full font-worksans font-[500] text-[16px]"
        aria-label="Agregar pasos"
      >
        + Agregar pasos
      </button>
    </div>
  );
}
