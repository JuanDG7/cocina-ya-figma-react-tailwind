import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import StepItem from "./StepItem";

type StepsState = {
  id: string;
  text: string;
  photo: { file: File | null; preview: string } | null;
};

type initialStepsProps = {
  initialSteps?: {
    id?: string;
    text: string;
    photos: string[];
  }[];
};

export default function StepsList({ initialSteps = [] }: initialStepsProps) {
  const [steps, setSteps] = useState<StepsState[]>(
    initialSteps.length > 0
      ? initialSteps.map((s) => ({
          id: s.id || uuidv4(), // id estable del paso
          text: s.text || "",
          photo: s.photos?.[0]
            ? {
                file: null,
                preview: s.photos[0].startsWith("blob:")
                  ? s.photos[0]
                  : `http://localhost:8080/${s.photos[0]}`,
              }
            : null,
        }))
      : [{ id: uuidv4(), text: "", photo: null }]
  );

  const allURLs = useRef<Set<string>>(new Set());
  useEffect(() => {
    return () => {
      allURLs.current.forEach((u) => URL.revokeObjectURL(u));
      allURLs.current.clear();
    };
  }, []);

  function addStep() {
    setSteps((prev) => [...prev, { id: uuidv4(), text: "", photo: null }]);
  }

  function changeText(index: number, text: string) {
    setSteps((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], text };
      return copy;
    });
  }

  function removeStep(index: number) {
    setSteps((prev) => {
      const copy = [...prev];
      const removed = copy.splice(index, 1)[0];
      if (removed?.photo?.preview) {
        URL.revokeObjectURL(removed.photo.preview);
        allURLs.current.delete(removed.photo.preview);
      }
      // Si borra todo, deja uno vacío
      return copy.length ? copy : [{ id: uuidv4(), text: "", photo: null }];
    });
  }

  function pickPhoto(stepIndex: number, file: File | null) {
    if (!file) return;
    const preview = URL.createObjectURL(file);
    allURLs.current.add(preview);
    setSteps((prev) => {
      const copy = [...prev];
      copy[stepIndex] = { ...copy[stepIndex], photo: { file, preview } };
      return copy;
    });
  }

  function removePhoto(stepIndex: number) {
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
    <div className="flex flex-col items-center gap-4 w-[95%]">
      <h2>Pasos para preparar</h2>

      {steps.map((s, i) => (
        <div key={s.id} className="w-full">
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

      <button
        type="button"
        onClick={addStep}
        className="flex-1 bg-secondary p-[12px] mt-5 ml-auto text-white rounded-full font-worksans font-[500] text-[16px]"
      >
        + Agregar paso
      </button>
    </div>
  );
}
