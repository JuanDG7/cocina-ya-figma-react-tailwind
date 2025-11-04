type CategorySelectorProps = {
  recipe?: { categoria?: string };
};

export default function CategorySelector({ recipe }: CategorySelectorProps) {
  return (
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
            defaultChecked={recipe ? recipe.categoria === "salado" : false}
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
            defaultChecked={recipe ? recipe.categoria === "dulce" : false}
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
            defaultChecked={recipe ? recipe.categoria === "postre" : false}
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
            defaultChecked={recipe ? recipe.categoria === "caldos" : false}
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
            defaultChecked={recipe ? recipe.categoria === "variados" : false}
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
  );
}
