import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StepItem from "./StepItem";

export default function StepsList() {
  const [steps, setSteps] = useState([
    { id: uuidv4(), text: "", photos: [] }, // photos: [{id, file, preview}]
  ]);

  const allURLs = useRef(new Set());
  useEffect(() => {
    return () => {
      allURLs.current.forEach((u) => URL.revokeObjectURL(u));
      allURLs.current.clear();
    };
  }, []);

  const MAX_PHOTOS = 3;

  function addStep() {
    setSteps((prev) => [...prev, { id: uuidv4(), text: "", photos: [] }]);
  }
  function changeText(index, text) {
    setSteps((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text };
      return copy;
    });
  }
  function removeStep(index) {
    setSteps((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      removed?.photos.forEach((p) => {
        if (p.preview) {
          URL.revokeObjectURL(p.preview);
          allURLs.current.delete(p.preview);
        }
      });
      return copy.length ? copy : [{ id: uuidv4(), text: "", photos: [] }];
    });
  }

  function pickPhotos(stepIndex, fileList) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);

    setSteps((prev) => {
      const copy = [...prev];
      const step = copy[stepIndex];
      const remaining = Math.max(0, MAX_PHOTOS - step.photos.length);
      const selected = files.slice(0, remaining);

      const newItems = selected.map((f) => {
        const preview = URL.createObjectURL(f);
        allURLs.current.add(preview);
        return { id: uuidv4(), file: f, preview };
      });

      copy[stepIndex] = { ...step, photos: [...step.photos, ...newItems] };
      return copy;
    });
  }

  function removePhoto(stepIndex, photoId) {
    setSteps((prev) => {
      const copy = [...prev];
      const step = copy[stepIndex];
      const target = step.photos.find((p) => p.id === photoId);
      if (target?.preview) {
        URL.revokeObjectURL(target.preview);
        allURLs.current.delete(target.preview);
      }
      copy[stepIndex] = {
        ...step,
        photos: step.photos.filter((p) => p.id !== photoId),
      };
      return copy;
    });
  }

  return (
    <div className="flex flex-col items-center   gap-4 w-[95%] ">
      <h2>Pasos para preparar</h2>

      {steps.map((s, i) => (
        <div key={s.id} className="w-full  ">
          <StepItem
            index={i}
            value={s.text}
            photos={s.photos}
            maxPhotos={MAX_PHOTOS}
            onChange={changeText}
            onRemove={removeStep}
            onPickPhotos={pickPhotos}
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
