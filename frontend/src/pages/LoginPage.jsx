import { useState } from "react";

import EyeOnIcon from "../assets/icons/icon-mage_eye.svg";
import EyeOffIcon from "../assets/icons/icon-mage_eye-off.svg";

import logoWebp from "../assets/logo-cocinaya.webp";
import logoPng from "../assets/logo-cocinaya.png";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <div className="fixed inset-0 -z-10 bg-[url(/img/background.svg)] bg-cover bg-center" />
      <section className=" w-full pb-10   mx-auto px-10 pt-8  min-h-dvh overflow-y-auto  ">
        {/* LOGO  */}
        {/* HECHO POR VOS .  */}
        <div className="flex flex-col  gap-y-2 mb-[55px]">
          <picture>
            <source srcSet={logoWebp} type="image/webp" />
            <img
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
        <form action="">
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
                  className="input pr-10 "
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
          </div>
          {/*                                          Olvidate tu contraseña */}
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
            className=" mb-[38px] mx-auto block bg-secondary py-[12px] w-full text-white rounded-full font-worksans font-[500] text-[16px]"
          >
            Iniciar sesión
          </button>
        </form>
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
          <span className="text-primary font-[500]">Regístrate</span>
        </p>
      </section>
    </>
  );
}
