// src/components/TermsCheckbox.jsx
type TermsCheckboxProps = {
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TermsCheckbox({
  checked,
  onChange,
}: TermsCheckboxProps) {
  return (
    <label
      htmlFor="terms"
      className="inline-flex items-center gap-2 select-none text-[14px] font-worksans mt-3"
    >
      <input
        id="terms"
        name="terms"
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
