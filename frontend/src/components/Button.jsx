export default function Button({
  children,
  className,
  variant = "primary",
  ...props
}) {
  const variantes = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary text-white",
    tertiary: "bg-transparent border border-primary text-primary",
  };

  return (
    <button
      {...props}
      type="submit"
      className={`min-w-[160px] w-full max-w-sm  py-[12px]   rounded-full font-worksans font-[500] text-[16px] ${className} ${variantes[variant]}`}
    >
      {children}
    </button>
  );
}
