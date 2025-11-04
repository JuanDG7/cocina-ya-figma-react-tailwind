import { Link, NavLink } from "react-router-dom";

import HomeIcon from "./icons/HomeIcon";
import PublicSearch from "./icons/PublicSearch";
import HeartIcon from "./icons/HeartIcon";
import DocumentEditIcon from "./icons/DocumentEditIcon";
import PlusIcon from "../assets/icons/icon-plus.svg";
export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50  max-w-screen-md mx-auto ">
      <div className="relative ">
        {/* FAB */}
        <Link
          to="/recipes/new"
          className="absolute -top-12 left-1/2 -translate-x-1/2 size-24 flex items-center justify-center"
          aria-label="Agregar"
        >
          <img className="" src={PlusIcon} alt="Agregar receta" />
        </Link>

        {/* barra (grid con hueco central) */}
        <ul className="grid grid-cols-5 h-16 bg-[url(/img/background.svg)] bg-cover bg-center   rounded-t-2xl items-center">
          <li className="flex justify-center">
            <NavLink to="/homepage">
              {({ isActive }) => {
                return (
                  <HomeIcon
                    active={isActive}
                    className="w-6 h-6 text-primary"
                  />
                );
              }}
            </NavLink>
          </li>
          <li className="flex justify-center">
            <NavLink to="/recipes">
              {({ isActive }) => (
                <PublicSearch
                  active={isActive}
                  className="w-6 h-6 text-primary"
                />
              )}
            </NavLink>
          </li>
          <li /> {/* hueco */}
          <li className="flex justify-center">
            <NavLink to="/favorite-recipe">
              {({ isActive }) => (
                <HeartIcon active={isActive} className="w-6 h-6 text-primary" />
              )}
            </NavLink>
          </li>
          <li className="flex justify-center">
            <NavLink to="/my-recipes">
              {({ isActive }) => (
                <DocumentEditIcon
                  active={isActive}
                  className="h-6 w-6 text-primary"
                />
              )}
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
