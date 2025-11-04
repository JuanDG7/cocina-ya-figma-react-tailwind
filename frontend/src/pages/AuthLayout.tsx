import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="max-w-screen-md mx-auto min-h-dvh">
      <Outlet />
    </main>
  );
}
