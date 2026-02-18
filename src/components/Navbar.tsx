"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const router = useRouter();

  const logOut = () => {
    document.cookie =
      "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";

    router.push("/login");
  };

  return (
    <nav className="flex justify-between px-10 py-5 bg-white border-b border-slate-200 sticky shadow-sm">
      <div className="flex items-center">
        <span className="font-bold text-lg">
          Panel CMS - Alejandro Vicente Carpena
        </span>
      </div>

      <div className="flex gap-10">
        <button
          onClick={logOut}
          className="flex items-centertext-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 px-5 py-2 rounded-lg transition-all"
        >
          {language === "es" ? "Cerrar Sesión" : "Logout"}
        </button>

        <div className="flex bg-slate-100 p-2 rounded-xl">
          <button
            onClick={() => setLanguage("es")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === "es"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-black"
              }`}
          >
            ESPAÑOL
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${language === "en"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-black"
              }`}
          >
            ENGLISH
          </button>
        </div>
      </div>
    </nav>
  );
}
