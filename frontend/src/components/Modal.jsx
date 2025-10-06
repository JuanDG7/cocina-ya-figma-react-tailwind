export default function Modal({
  isSubmitting,
  onClose,
  onConfirm,

  confirmLabel,
  cancelLabel,
  title,
  description,
}) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
        {/* Título */}
        <h2 className="text-[20px] font-semibold text-oscuro mb-2">{title}</h2>

        {/* Texto */}
        <p className="text-sm text-grisoscuro mb-6">{description}</p>

        {/* Botones */}
        <div className="flex justify-center gap-3">
          <button
            disabled={isSubmitting}
            onClick={onClose}
            className="px-5 py-2 rounded-full border border-primary text-primary font-semibold hover:bg-primary/10 transition"
          >
            {isSubmitting ? "Enviando..." : cancelLabel}
          </button>

          <button
            disabled={isSubmitting}
            onClick={onConfirm}
            className="px-5 py-2 rounded-full bg-primary text-white font-semibold hover:bg-primary transition"
          >
            {isSubmitting ? "Enviando..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
