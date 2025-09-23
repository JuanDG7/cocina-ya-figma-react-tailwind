import HomeIcon from "../assets/icons/icon-home.svg";
import BellIcon from "../assets/icons/icon-bell.svg";
import HeartIcon from "../assets/icons/icon-heart.svg";
import DocumentEditIcon from "../assets/icons/icon-edit-document.svg";
import PlusIcon from "../assets/icons/icon-plus.svg";
export default function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50  lg:hidden ">
      <div className="relative mx-auto  ">
        {/* FAB */}
        <button
          className="absolute -top-16 left-1/2 -translate-x-1/2 size-32 flex items-center justify-center"
          aria-label="Agregar"
        >
          <img src={PlusIcon} alt="" />
        </button>

        {/* barra (grid con hueco central) */}
        <ul className="grid grid-cols-5 h-16 bg-[url(/img/background.svg)] bg-cover bg-center   rounded-t-2xl items-center">
          <li className="flex justify-center">
            <img src={HomeIcon} className="w-6 h-6" />
          </li>
          <li className="flex justify-center">
            <img src={BellIcon} className="w-6 h-6" />
          </li>
          <li /> {/* hueco */}
          <li className="flex justify-center">
            <img src={HeartIcon} className="w-6 h-6" />
          </li>
          <li className="flex justify-center">
            <img src={DocumentEditIcon} className="w-6 h-6" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
