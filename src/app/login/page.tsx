"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [user, setUser] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (user === "admin" && pass === "admin") {
      document.cookie = "auth-token=true; path=/; max-age=86400";
      router.push("/panel");
    } else {
      setError("Credenciales incorrectas. Intenta admin / admin");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <div className="w-full max-w-md p-5">
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-8 tracking-tight">
          Panel CMS
        </h1>

        <form
          onSubmit={handleLogin}
          className="bg-white border border-slate-200 rounded-2xl p-8 space-y-5 shadow-sm"
        >
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">Usuario</span>
            <input
              type="text"
              placeholder="Ej: admin"
              className="border border-slate-200 rounded-xl p-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              onChange={(e) => setUser(e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-medium text-slate-700">
              Contraseña
            </span>
            <input
              type="password"
              placeholder="•••••"
              className="border border-slate-200 rounded-xl p-3 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all shadow-sm"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
