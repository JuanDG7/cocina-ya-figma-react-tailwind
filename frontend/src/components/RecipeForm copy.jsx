import {
  Form,
  useSubmit,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { useState, useRef } from "react";

import Modal from "../components/Modal";

import MainPhotoPicker from "./MainPhotoPicker";

import { IngredientList } from "./IngredientList";
import StepsList from "./StepList";

export default function RecipeForm({ data, method }) {
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData();
  const errores = Array.isArray(actionData?.erroresBack)
    ? actionData.erroresBack
    : [];

  console.log("📥 Respuesta èn el Frontend:", errores);

  return (
    <div className="">
      {/* FORMULARIO*/}
      <Form method={method} ref={formRef} encType="multipart/form-data">
        {/* Lista de errores */}
        {errores.length > 0 && (
          <ul className="text-red-900 mb-4">
            {errores.map((err, i) => (
              <li key={i}>{err.msg}</li>
            ))}
          </ul>
        )}

        <div className="flex flex-col gap-y-8 justify-center items-center w-full border border-black/20 rounded-2xl overflow-hidden shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
          {/* === FOTO: botón gigante clickeable === */}
          <MainPhotoPicker />
          {/* INPUT TITULO*/}
          <div className="w-[95%] ">
            <label className="label " htmlFor="titulo">
              Titulo
            </label>
            <input
              type="text"
              name="titulo"
              id="titulo"
              placeholder="Milanesa a la napolitana"
              className=" input "
              defaultValue={data ? data.titulo : ""}
            />
          </div>
          {/* MÉTRICAS: kcal · minutos · porciones */}
          <div className="w-[95%] grid grid-cols-3 gap-3">
            <div>
              <label className="label" htmlFor="calorias">
                Calorías
              </label>
              <input
                type="text"
                id="calorias"
                name="calorias" /* ← ajusta a tu backend si usa 'calories' */
                placeholder="590"
                required
                className="input"
                inputMode="numeric"
                title="Ingrese solo numeros (ej:590) "
                defaultValue={data ? data.calorias : ""}
              />
            </div>

            <div>
              <label className="label" htmlFor="tiempoMin">
                Tiempo (min)
              </label>
              <input
                type="text"
                id="tiempoMin"
                name="tiempoMin" /* ← o 'time_minutes' / 'timeMinutes' */
                placeholder="20"
                required
                className="input"
                inputMode="numeric"
                title="Ingrese solo numeros (ej:30) "
                defaultValue={data ? data.tiempoMin : ""}
              />
            </div>

            <div>
              <label className="label" htmlFor="porciones">
                Porciones
              </label>
              <input
                type="text"
                id="porciones"
                name="porciones" /* ← o 'servings' */
                placeholder="5"
                required
                className="input"
                inputMode="numeric"
                title="Ingrese solo numeros (ej:5) "
                defaultValue={data ? data.porciones : ""}
              />
            </div>
          </div>

          {/* Descripcion:Opcional*/}
          <div className="w-[95%] ">
            <label className="label" htmlFor="descripcion">
              Descripcion:Opcional
            </label>
            <textarea
              type="textarea"
              name="descripcion"
              id="descripcion"
              placeholder="Contanos un poco sobre tu receta"
              className="input min-h-[150px]"
              defaultValue={data ? data.descripcion : ""}
            />
          </div>
          {/*Categoria*/}
          <fieldset className="w-[95%]">
            <legend className="label">Categoría</legend>
            <div className="flex flex-wrap gap-4">
              <div>
                <input
                  id="cat-salado"
                  name="categoria"
                  type="radio"
                  value="salado"
                  className="peer sr-only"
                  required
                  defaultChecked
                />
                <label
                  htmlFor="cat-salado"
                  className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
        text-[14px] cursor-pointer select-none hover:border-black/60 peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white"
                >
                  Salado
                </label>
              </div>
              <div>
                <input
                  id="cat-dulce"
                  name="categoria"
                  type="radio"
                  value="dulce"
                  className="peer sr-only"
                  required
                />
                <label
                  htmlFor="cat-dulce"
                  className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
        text-[14px] cursor-pointer select-none hover:border-black/60 peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white"
                >
                  Dulce
                </label>
              </div>
              <div>
                <input
                  id="cat-postre"
                  name="categoria"
                  type="radio"
                  value="postre"
                  className="peer sr-only"
                  required
                />
                <label
                  htmlFor="cat-postre"
                  className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
        text-[14px] cursor-pointer select-none hover:border-black/60 peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white"
                >
                  Postre
                </label>
              </div>
              <div>
                <input
                  id="cat-caldos"
                  name="categoria"
                  type="radio"
                  value="caldos"
                  className="peer sr-only"
                  required
                />
                <label
                  htmlFor="cat-caldos"
                  className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
        text-[14px] cursor-pointer select-none hover:border-black/60 peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white"
                >
                  Caldos
                </label>
              </div>
              <div>
                <input
                  id="cat-variados"
                  name="categoria"
                  type="radio"
                  value="variados"
                  className="peer sr-only"
                  required
                />
                <label
                  htmlFor="cat-variados"
                  className="px-4 h-11 inline-flex items-center rounded-full border border-black/20 bg-white
        text-[14px] cursor-pointer select-none hover:border-black/60 peer-checked:border-transparent peer-checked:bg-primary peer-checked:text-white"
                >
                  Variados
                </label>
              </div>
            </div>
          </fieldset>
          {/* INGREDIENTES*/}
          <IngredientList />
          {/* PASOS para preparar */}
          <StepsList />

          <div className="w-[95%] space-y-5 pb-10">
            {" "}
            <label className="self-start font-worksans text-oscuro text-[16px] font-[500] block mb-[2px]">
              {" "}
              Consejos extra
            </label>
            <input
              type="text"
              className=" border p-5 w-full  rounded-sm h-[45px] bg-white text-oscuro placeholder:text-grisclaro/80  text-[14px] font-worksans font-[400]"
              placeholder="Consejos extras!"
              name="consejos"
              defaultValue={data ? data.consejos : ""}
            />
            <div className="flex gap-4">
              <button
                type="button"
                className="flex-1 bg-primary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px]"
              >
                Borrar receta
              </button>
              <button
                type="button"
                onClick={() => {
                  setModalOpen(true);
                }}
                className="flex-1 bg-secondary py-[12px] text-white rounded-full font-worksans font-[500] text-[16px]"
              >
                Agregar receta
              </button>
            </div>
          </div>
        </div>
      </Form>

      {modalOpen && (
        <Modal
          isSubmitting={isSubmitting}
          title="Agregar esta receta?"
          description="Se enviará a tu biblioteca. Podrás editarla después."
          confirmLabel="Agregar Receta"
          cancelLabel="Cancelar"
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            if (!formRef.current) return;
            setModalOpen(false);
            submit(formRef.current);
          }}
        />
      )}
    </div>
  );
}

export async function action({ request, params }) {
  const data = await request.formData(); // RAW (string o null)

  let url = "http://localhost:8080/feed/post";

  if (request.method === "PATCH") {
    const eventId = params.recipeId;
    url = "http://localhost:8080/feed/post/" + eventId;
  }
  const response = await fetch(url, {
    method: request.method,

    body: data,
  });

  if (response.status === 422) {
    //si vuelve un error de validacion del backend, va a useActionData() en el RecipeForm
    console.log(response);

    return response;
  }

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "error en RecipeForm" }), {
      status: response.status,
    });
  }
  return redirect("/homepage");
}
