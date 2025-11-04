import { Link, LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "tertiary";

interface LinkButtonProps extends LinkProps {
  to: string;
  children: React.ReactNode;
  className: string;
  variant?: Variant;
}

export default function LinkButton({
  to,
  children,
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  const variantes: Record<Variant, string> = {
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
