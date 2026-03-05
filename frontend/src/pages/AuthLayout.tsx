import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <main className="max-w-screen-md min-h-dvh mx-auto ">
      <div className="fixed inset-0 -z-10 bg-[url(/img/background.svg)] bg-cover bg-center" />
      <Outlet />
    </main>
  );
}

// max-w-screen-md   <--  ancho maximo md=768px
// mx-auto           <-- centra contenido, margin-left:auto; margin-right:auto;
// min-h-dvh         <-- altura dinamica en mobile
