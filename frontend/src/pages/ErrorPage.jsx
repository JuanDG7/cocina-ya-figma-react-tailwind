import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Error Standart madafaka!!";
  let message = "Algo salio mal...";

  if (error.status === 500) {
    title =
      "El servidor esta ON, recibio la peticion pero algo falla en su logica y devuelve STATUS 500";
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = "PAGINA O RECURSO NO ENCONTRADO!!";
    message = JSON.parse(error.data).message;
  }
  return (
    <main className="w-full mx-auto min-h-dvh bg-primary">
      <h1>{title}</h1>
      <h2>{message}</h2>
    </main>
  );
}
