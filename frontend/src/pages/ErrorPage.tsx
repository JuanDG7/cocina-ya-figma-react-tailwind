import { useRouteError } from "react-router-dom";

// al arrojar trow New Response llega un objeto, dentro es creado un campo llamado "data" el cual viene serializado, por eso es necesario JSON.parse(error.data) para leer el primer parametro enviado en throw New Response, y el segundo campo viene en el objeto error.status y puede leerse directamente porque es un metadato que no fue serializado
type RouteError = {
  status: number;
  data: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  let title = "Error Standart madafaka!!";
  let message = "Algo salio mal...";

  if (error.status === 500) {
    title =
      "El servidor esta ON, recibio la peticion pero algo falla en su logica y devuelve STATUS 500";
    message = JSON.parse(error.data).message;
  }
  if (error.status === 404) {
    title = "PAGINA O RECURSO NO ENCONTRADO!!";

    message = error.data;
  }
  return (
    <main className="w-full mx-auto min-h-dvh bg-primary">
      <h1>{title}</h1>
      <h2>{message}</h2>
    </main>
  );
}
