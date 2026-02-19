"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();

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

      <div className="flex gap-5">
        <button
          onClick={logOut}
          className="px-5 py-2 text-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
        >
          {language === "es" ? "Cerrar Sesión" : "Logout"}
        </button>
        <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => setLanguage("es")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              language === "es"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ES
          </button>

          <button
            onClick={() => setLanguage("en")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              language === "en"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  );
}
