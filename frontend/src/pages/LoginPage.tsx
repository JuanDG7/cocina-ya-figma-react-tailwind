import { useState } from "react";
import { Form, Link, redirect, useActionData } from "react-router-dom";
import { type ActionFunctionArgs } from "react-router-dom";

import EyeOnIcon from "../assets/icons/icon-mage_eye.svg";
import EyeOffIcon from "../assets/icons/icon-mage_eye-off.svg";

import logoWebp from "../assets/logo-cocinaya.webp";
import logoPng from "../assets/logo-cocinaya.png";

type ResponseSuccess = {
  token: string;
  userId: string;
};

type ResponseError = {
  error: string;
  data?: string;
};

type LoginPageActionResponse = ResponseSuccess | ResponseError;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const actionData = useActionData<LoginPageActionResponse>();

  return (
    <>
      <section className=" w-full pb-10   mx-auto px-10 pt-8  min-h-dvh">
        {/* LOGO  */}
        {/* HECHO POR VOS .  */}
        <div className="flex flex-col  gap-y-2 mb-[55px]">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img
              //TODO aqui podria colocar esto, para que sea mas responsive
              /*
<picture>
  <source media="(min-width: 768px)" srcSet="logo-desktop.webp" />
  <source media="(max-width: 767px)" srcSet="logo-mobile.webp" />
  <img src="logo-default.png" alt="Logo" />
</picture>

              */
              className="w-[290px] mx-auto"
              width={290}
              src={logoPng}
              alt="Logo de CocinaYa"
              loading="eager"
              decoding="async"
            />
          </picture>
          <p className="text-primary ml-16 text-center  font-worksans font-[500] text-[14px] leading-[21px] tracking-[0.35em] uppercase">
            Hecho por vos .
          </p>
        </div>
        {/* FORMULARIO */}
        <Form method="post" action=".">
          <div className="space-y-11 mb-1">
            <div className="">
              {/* EMAIL*/}
              {/* EXAMPLE@GMAIL.COM*/}
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="example@gmail.com"
                className="input"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
                autoComplete="username"
              />
            </div>
            {/* Password*/}
            {/* ********************************/}
            <div>
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                {" "}
                <input
                  className="input pr-10  "
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="**************"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-0 bottom-0 right-3 flex items-center cursor-pointer"
                >
                  <img
                    className="w-5 h-5"
                    src={showPassword ? EyeOnIcon : EyeOffIcon}
                    alt={
                      showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
          {/*                                          Olvidate tu contraseña */}
          {/*TODO envez de anchor usar Link, y escribir codigo para resetear contrasenha */}
          <div className="text-right mb-13">
            <a
              href=""
              className="text-worksans text-[14px] font-[400] text-primary hover:underline hover:underline-offset-2 text-right"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {/*                                           INICIAR SESSION */}{" "}
          <button
            type="submit"
            className=" mb-[38px]  block w-full bg-secondary py-[12px]  text-white rounded-full font-worksans font-[500] text-[16px]"
          >
            Iniciar sesión
          </button>
          {/*                                           POSIBLE MENSAJE DE ERROR DE AUTHENTICATION */}{" "}
          {"error" in (actionData || {}) && (
            <p className="text-red-500 text-center text-sm mt-3">
              {(actionData as ResponseError).error}
            </p>
          )}
        </Form>
        {/*  ----------------O INICIA SESION CON---------------------------- */}
        <div className="flex items-center  gap-4 mb-8">
          <hr className="flex-1" />
          <span className="font-[500] text-[14px] font-raleway text-grisoscuro">
            O inicia sesion con
          </span>
          <hr className="flex-1" />
        </div>
        {/*  ---------------`LOGIN REDES SOCIALES`---------------------------- */}
        {/*  ---------------`LOGIN GOOGLE`---------------------------- */}
        <div className="flex   gap-x-[22px] mb-[38px] items-center justify-center">
          <picture>
            <source
              srcSet="/assets/icons/google-login.webp"
              type="image/webp"
            />
            <img
              width={61}
              src="/assets/icons/google-login@2x.png"
              alt="Google login"
              loading="lazy"
              decoding="async"
              className="shadow-lg rounded-full"
            />
          </picture>

          <picture>
            {/*  ---------------`LOGIN APPLE`---------------------------- */}
            <source srcSet="/assets/icons/apple-login.webp" type="image/webp" />
            <img
              width={61}
              src="/assets/icons/apple-login@2x.png"
              alt="Apple login"
              loading="lazy"
              decoding="async"
              className="shadow-lg rounded-full"
            />
          </picture>
          {/*  ---------------`LOGIN FACEBOOK`---------------------------- */}
          <picture>
            <source
              srcSet="/assets/icons/facebook-login.webp"
              type="image/webp"
            />
            <img
              width={61}
              src="/assets/icons/facebook-login@2x.png"
              alt="Facebook login"
              loading="lazy"
              decoding="async"
              className="shadow-lg rounded-full"
            />
          </picture>
        </div>

        {/* NO TENES UNA CUENTA? REGISTRATE */}
        <p className="text-center font-worksans text-[14px] font-[400]">
          ¿No tenés una cuenta?{" "}
          <Link to="register">
            <span className="text-primary font-[500]">Regístrate</span>
          </Link>
        </p>
      </section>
    </>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  // 1️⃣ Obtener los datos del formulario
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const data = {
    email,
    password,
  };

  // 2️⃣ Enviar la solicitud al backend
  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // 3️⃣ Manejar errores
  if (!response.ok) {
    const errorData = await response.json();
    // ✅ devolvés un objeto que React Router le pasa al componente
    return { error: errorData.message || "No fue posible autenticarse." };
  }

  // 4️⃣ Obtener datos del backend (token, userId, etc.)
  const resData = await response.json();
  console.log(`El token es 🚩:${resData.token}`);
  console.log(`El userId es 🚩:${resData.userId}`);

  // 💾 Guardar token en localStorage (opcional)
  localStorage.setItem("token", resData.token);
  localStorage.setItem("userId", resData.userId);
  // 5️⃣ Redirigir al usuario
  return redirect("/homepage");
}
