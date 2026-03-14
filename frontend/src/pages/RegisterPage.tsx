import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { Form } from "react-router-dom";
import { useActionData } from "react-router-dom";
import type { ActionFunctionArgs } from "react-router-dom";

import EyeOffIcon from "../assets/icons/icon-mage_eye-off.svg";
import EyeOnIcon from "../assets/icons/icon-mage_eye.svg";
import IconLeftArrow from "../assets/icons/icon-left-arrow.svg";
import TermsCheckbox from "../components/TermsCheckbox";
import api from "../lib/axios";

type ZodIssue = {
  path: (string | number)[];
  message: string;
};

type ResponseError = {
  error: string;
  data?: ZodIssue[];
};

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const actionData = useActionData<ResponseError>();

  const navigate = useNavigate();

  const fieldErrors = Object.fromEntries(
    (actionData?.data || []).map((issue) => [issue.path[0], issue.message])
  );

  return (
    <>
      <main className="w-full mx-auto px-10  md:max-w-[520px] lg:max-w-[640px] md:bg-white/40 md:rounded-3xl md:shadow-sm lg:bg-white/60 lg:backdrop-blur ">
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
            <div>
              <h1 className="text-[34px] font-semibold">Crear cuenta</h1>
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
            {fieldErrors.nombre && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.nombre}
              </p>
            )}
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
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.email}
              </p>
            )}
            {/* Password*/}
            {/* ********************************/}
            <div className="">
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
            {fieldErrors.password && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.password}
              </p>
            )}
            {/* Confirmar Password*/}
            {/* ********************************/}
            <div className="">
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
                  autoComplete="off"
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
            {fieldErrors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2 min-h-[20px]">
                {fieldErrors.confirmPassword}
              </p>
            )}
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
          {actionData?.error && !actionData.data?.length && (
            <p className="text-red-500 text-center text-sm mt-3">
              {actionData.error}
            </p>
          )}
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

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  try {
    await api.put("/auth/signup", formData);
    return redirect("/");
  } catch (error: any) {
    return {
      error: error.response?.data?.message || "No fue posible crear la cuenta.",
      data: error.response?.data?.data || [],
    };
  }
}
