import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";

import EyeOffIcon from "../assets/icons/icon-mage_eye-off.svg";
import EyeOnIcon from "../assets/icons/icon-mage_eye.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import TermsCheckbox from "../components/TermsCheckbox";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const data = useActionData();

  const navigate = useNavigate();

  return (
    <>
      {data?.data && (
        <ul className="text-red-500 text-sm mt-2 space-y-1">
          {data.data.map((err) => (
            <li key={err.msg}>{err.msg}</li>
          ))}
        </ul>
      )}
      <div className="fixed inset-0 -z-10 bg-[url(/img/background.svg)] bg-cover bg-center" />
      <main className="w-full mx-auto px-10 min-h-dvh overflow-y-auto">
        <header className="font-raleway text-[24px] text-center pt-19 font-semibold">
          <div className=" flex justify-between items-center">
            <button
              className="h-11 w-11 flex items-center justify-center "
              onClick={() => navigate(-1)}
            >
              {/*FLECHITA A LA IZQUIERDA*/}
              <img className="h-[24px] w-[24px]" src={IconLeftArrow} alt="" />
            </button>
            {/*TITULO */}
            <div className="flex items-center gap-2">
              <h1 className="text-[34px] font-semibold">Crear Receta</h1>
            </div>
            {/* Spacer derecho del mismo ancho que el botón izquierdo */}
            <div className="h-11 w-11" aria-hidden />{" "}
          </div>
        </header>
        {/* FORMULARIO */}
        <Form method="put" className="mt-7">
          <div className="space-y-5 mb-1">
            <div className="">
              {/* NOMBRE*/}

              <label className="label" htmlFor="nombre">
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="John Doe"
                className="input"
                autoComplete="name"
              />
            </div>

            <div className="space-y-0">
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
                autoComplete="username"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>

            {/* Password*/}
            {/* ********************************/}
            <div className="space-y-0">
              <label className="label" htmlFor="password">
                Password
              </label>
              <div className="relative">
                {" "}
                <input
                  className="input pr-10"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="**************"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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

            {/* Confirmar Password*/}
            {/* ********************************/}
            <div className="space-y-0">
              <label className="label" htmlFor="confirmPassword">
                Confirmar pasword
              </label>

              <div className="relative">
                {" "}
                <input
                  className="input pr-10"
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="**************"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
          {/* Agree with Terms & Condition */}
          <TermsCheckbox
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          {/*                                           INICIAR SESSION */}{" "}
          <button
            type="submit"
            className="mt-8 mb-[33px] mx-auto block bg-secondary py-[12px] w-full text-white rounded-full font-worksans font-[500] text-[16px]"
          >
            Crear Cuenta
          </button>
        </Form>
        {/*  ----------------O INICIA SESION CON---------------------------- */}
        <div className="flex items-center gap-4 mb-8">
          <hr className="flex-1" />
          <span className="font-[500] text-[14px] font-raleway text-grisoscuro">
            O inicia sesion con
          </span>
          <hr className="flex-1" />
        </div>
        {/*  ---------------`LOGIN REDES SOCIALES`---------------------------- */}
        {/*  ---------------`LOGIN GOOGLE`---------------------------- */}
        <div className="flex  gap-x-[22px] mb-[38px] justify-center">
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
      </main>
    </>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  // const data = Object.fromEntries(formData.entries());   <---   ESTO ES SOLAMENTE SI QUIERO HACER VALIDACION MANUAL

  // // Validación simple antes de enviar
  // if (!data.email || !data.password || !data.nombre) {
  //   throw new Response("Faltan campos obligatorios", { status: 400 });
  // }

  // const response = await fetch("http://localhost:8080/auth/signup", {
  //   method: "PUT",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     name: data.nombre,
  //     email: data.email,
  //     password: data.password,
  //   }),
  // });

  const response = await fetch("http://localhost:8080/auth/signup", {
    method: "PUT",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    return errorData;
  }

  // const data1 = await response.json();
  return redirect("/");
}
