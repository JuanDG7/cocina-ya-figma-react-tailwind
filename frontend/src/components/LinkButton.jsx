import { Link } from "react-router-dom";

export default function LinkButton({
  to,
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
    <Link
      to={to}
      className={`inline-flex items-center justify-center min-w-[160px] w-full max-w-sm  py-[12px]   rounded-full font-worksans font-[500] text-[16px] ${className} ${variantes[variant]}`}
      {...props}
    >
      {children}
    </Link>
  );
}
