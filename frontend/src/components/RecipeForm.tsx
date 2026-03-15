import {
  Form,
  useSubmit,
  useNavigation,
  useActionData,
  redirect,
} from "react-router-dom";
import { useState, useRef } from "react";
import Modal from "./Modal";
import type { ActionFunctionArgs } from "react-router-dom";
import MainPhotoPicker from "./MainPhotoPicker";
import IngredientList from "./IngredientList";
import CategorySelector from "./CategorySelector";
import StepsList from "./StepList";
import { type Recipe } from "../types/recipe";
import api from "../lib/axios";

//TODO sacar el button borrar receta?? ya queno hace nada cuando voy a crear un recipe new???

type RecipeFormProps = {
  data?: Recipe;
  method: "put" | "post";
};

type ZodIssue = {
  path: (string | number)[];
  message: string;
};

type ResponseError = {
  message?: string;
  data?: ZodIssue[];
};

export default function RecipeForm({ data, method }: RecipeFormProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<ResponseError>();

  const fieldErrors = Object.fromEntries(
    (actionData?.data || [])
      .filter((issue) => issue.path?.length)
      .map((issue) => [issue.path.join("."), issue.message])
  );

  const globalError =
    actionData?.message && !(actionData?.data?.length ?? 0 > 0)
      ? actionData.message
      : null;

  return (
    <div className="">
      {/* FORMULARIO*/}
      <Form method={method} ref={formRef} encType="multipart/form-data">
        {/*Error general*/}
        {globalError && (
          <div className="w-[95%] text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-md">
            {globalError}
          </div>
        )}
        <div className="flex flex-col gap-y-8 justify-center items-center w-full border border-black/20 rounded-2xl overflow-hidden shadow-[0_0px_3px_0_rgba(0,0,0,0.75)]">
          {/* === FOTO: botón gigante clickeable === */}
          <MainPhotoPicker existingImage={data ? data.imageUrl : null} />
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
              title="Ingrese un titulo "
            />
            {fieldErrors.titulo && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.titulo}
              </p>
            )}
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
              {fieldErrors.calorias && (
                <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                  {fieldErrors.calorias}
                </p>
              )}
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
              {fieldErrors.tiempoMin && (
                <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                  {fieldErrors.tiempoMin}
                </p>
              )}
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
              {fieldErrors.porciones && (
                <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                  {fieldErrors.porciones}
                </p>
              )}
            </div>
          </div>

          {/* Descripcion:Opcional*/}
          <div className="w-[95%] ">
            <label className="label" htmlFor="descripcion">
              Descripcion:Opcional
            </label>
            <textarea
              name="descripcion"
              id="descripcion"
              placeholder="Contanos un poco sobre tu receta"
              className="input min-h-[150px]"
              defaultValue={data ? data.descripcion : ""}
            />
            {fieldErrors.descripcion && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.descripcion}
              </p>
            )}
          </div>
          {/*Categoria*/}
          <CategorySelector recipe={data} fieldError={fieldErrors.categoria} />
          {/* INGREDIENTES*/}
          <IngredientList
            initialIngredients={data?.ingredients || []}
            fieldErrors={fieldErrors}
          />
          {/* PASOS para preparar */}
          <StepsList
            initialSteps={data?.steps || []}
            fieldErrors={fieldErrors}
          />

          <div className="w-[95%] space-y-5 pb-10">
            {" "}
            <label className=" font-worksans text-oscuro text-[16px] font-[500] block mb-[2px]">
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
            {fieldErrors.consejos && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.consejos}
              </p>
            )}
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
          title={
            method === "put" ? "¿Editar esta receta?" : "¿Agregar esta receta?"
          }
          description={
            method === "put"
              ? "Se actualizarán los datos de la receta existente."
              : "Se enviará a tu biblioteca. Podrás editarla después."
          }
          confirmLabel="Agregar Receta"
          cancelLabel="Cancelar"
          onClose={() => setModalOpen(false)}
          onConfirm={() => {
            if (!formRef.current) return;
            setModalOpen(false);
            submit(formRef.current, { method: method });
          }}
        />
      )}
    </div>
  );
}

export async function action({
  request,
  params,
}: ActionFunctionArgs): Promise<Response | ResponseError> {
  const formData = await request.formData(); // RAW (string o null)

  let url = "/recipe";
  console.log("🧾 METHOD ES:", request.method);

  if (request.method === "PUT") {
    const recipeId = params.recipeId;
    url = `/recipe/${recipeId}`;
  }
  try {
    //AQUI PODRIA NO USAR CONST {DATA}
    const { data } = await api({
      url: url,
      method: request.method,
      data: formData,
    });
    return redirect("/homepage");
  } catch (error: any) {
    return {
      message:
        error.response?.data?.message || "No fue posible guardar la receta.",
      data: error.response?.data?.data || [],
    };
  }
}
