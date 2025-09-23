// src/components/TermsCheckbox.jsx
export default function TermsCheckbox({ id = "terms", checked, onChange }) {
  return (
    <label
      htmlFor={id}
      className="inline-flex items-center gap-2 select-none text-[14px] font-worksans mt-3"
    >
      <input
        id={id}
        name={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required
        className="size-4 rounded-sm border border-gray-400 accent-primary"
      />
      <span className="text-grisoscuro">
        I agree with{" "}
        <a href="/terms" className="underline underline-offset-2 text-primary">
          Terms & Conditions
        </a>
      </span>
    </label>
  );
}
