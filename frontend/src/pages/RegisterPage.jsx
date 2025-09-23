import { useState } from "react";

import EyeOffIcon from "../assets/icons/icon-mage_eye-off.svg";
import EyeOnIcon from "../assets/icons/icon-mage_eye.svg";

import TermsCheckbox from "../components/TermsCheckbox";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url(/img/background.svg)] bg-cover bg-center" />
      <main className="w-full mx-auto px-10 min-h-dvh overflow-y-auto">
        <header className="font-raleway text-[24px] text-center pt-19 font-semibold">
          Crear cuenta
        </header>
        {/* FORMULARIO */}
        <form action="" className="mt-7">
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
            Iniciar sesión
          </button>
        </form>
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
        {/* NO TENES UNA CUENTA? REGISTRATE */}
        <p className="text-center font-worksans text-[14px] font-[400]">
          ¿No tenés una cuenta?{" "}
          <span className="text-primary font-[500]">Regístrate</span>
        </p>
      </main>
    </>
  );
}
