export default function Modal({ onClose, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        {/* Título */}
        <h2 className="text-[20px] font-semibold text-oscuro mb-2">
          ¿Borrar esta receta?
        </h2>

        {/* Texto */}
        <p className="text-sm text-grisoscuro mb-6">
          Esta acción no se puede deshacer. <br />
          La receta se eliminará de forma permanente.
        </p>

        {/* Botones */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition"
          >
            Editar receta
          </button>

          <button
            onClick={onDelete}
            className="px-5 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary transition"
          >
            Borrar receta
          </button>
        </div>
      </div>
    </div>
  );
}
