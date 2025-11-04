import StepItem from "./StepItem";

export default function PreparationSteps() {
  return (
    <div className="w-[95%] flex flex-col space-y-2">
      <h2>Pasos para preparar</h2>

      {/* pasos (ejemplo estático por ahora) */}
      <StepItem />
      <StepItem />

      {/* botones inferiores */}
      <div className="flex gap-3 mt-3">
        <button
          type="button"
          className="flex-1 bg-secondary text-white py-2 rounded-full"
        >
          + Agregar pasoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        </button>

        <button
          type="button"
          className="flex-1 bg-rose-600 text-white py-2 rounded-full"
        >
          – Quitar último paso
        </button>
      </div>
    </div>
  );
}
