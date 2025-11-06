import { Outlet } from "react-router-dom";
import BottomNav from "../components/BottomNav.js";

export default function RootLayout() {
  return (
    <main className="max-w-screen-md mx-auto min-h-dvh overflow-y-auto pb-40">
      <Outlet />
      <BottomNav />
    </main>
  );
}
