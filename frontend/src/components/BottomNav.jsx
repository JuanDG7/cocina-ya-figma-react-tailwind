import { Link, NavLink } from "react-router-dom";

import HomeIcon from "./icons/HomeIcon.jsx";
import PublicSearch from "./icons/PublicSearch.jsx";
import HeartIcon from "./icons/HeartIcon.jsx";
import DocumentEditIcon from "./icons/DocumentEditIcon.jsx";
import PlusIcon from "../assets/icons/icon-plus.svg";
export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50  lg:hidden ">
      <div className="relative ">
        {/* FAB */}
        <Link
          to="/new-recipe"
          className="absolute -top-12 left-1/2 -translate-x-1/2 size-24 flex items-center justify-center"
          aria-label="Agregar"
        >
          <img className="" src={PlusIcon} alt="" />
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
            <NavLink to="/notification">
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
