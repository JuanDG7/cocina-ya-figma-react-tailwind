import { useRouteError } from "react-router-dom";

// al arrojar trow New Response llega un objeto, dentro es creado un campo llamado "data" el cual viene serializado, por eso es necesario JSON.parse(error.data) para leer el primer parametro enviado en throw New Response, y el segundo campo viene en el objeto error.status y puede leerse directamente porque es un metadato que no fue serializado
type RouteError = {
  status: number;
  data: string;
};
//TODO data deberia ser unknown y deberia verificar que es, si es string, impriimir string, si es array iterarlo y imprimir, etc etc etc

//todo normalizar mi middleware global de erorr en el backend para que tenga esta estructura
// {
//   "message": "Validación falló",
//   "errors": [
//     { "field": "email", "message": "Email inválido" }
//   ]
// }

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
  // al enviar throw new Response, REACT ROUTER lo envuelve en 'data' por eso existe error.data.message y no solamente error.message,
  /*
throw new response('esto es un string',{status:500})                             <--- el 1er parametro SIEMPRE ES 'data'
throw new response(JSON.stringify({' message: "Error al cargar tus recetas"'}),{status:500})    <--- como es STRING para convertirlo a OBJETO NUEVAMENTE SE UTILIZA, JSON.parse(error.data)


  */

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

/*


/*
===============================
🔥 FORMAS DE LANZAR ERRORES EN RR v7
===============================

1️⃣ FORMA RECOMENDADA (MODERNA)
--------------------------------

throw Response.json(
  { message: "Error de servidor", data: [...] },
  { status: 500 }
);

✔ Content-Type → application/json
✔ error.status → 500
✔ error.data → objeto { message, data }
❌ NO necesitas JSON.parse


2️⃣ new Response SIN headers
--------------------------------

throw new Response(
  JSON.stringify({ message: "Error de servidor" }),
  { status: 500 }
);

✔ Content-Type → text/plain;charset=UTF-8
✔ error.status → 500
✔ error.data → string
✔ Necesitas JSON.parse(error.data)


3️⃣ new Response CON headers JSON
--------------------------------

throw new Response(
  JSON.stringify({ message: "Error de servidor" }),
  {
    status: 500,
    headers: { "Content-Type": "application/json" }
  }
);

✔ Content-Type → application/json
✔ error.status → 500
✔ error.data → objeto
❌ NO necesitas JSON.parse


===============================
🧠 REGLA SIMPLE
===============================

- Si Content-Type es application/json → NO parsear.
- Si Content-Type es text/plain → SÍ parsear.
- throw new Error("mensaje") → solo error.message (sin status ni data).
*/
