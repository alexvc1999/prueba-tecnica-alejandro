export default function Navbar() {
  return (
    <nav className="flex justify-between px-10 py-5 bg-white border-b border-slate-200 sticky shadow-sm">
      <div className="flex items-center">
        <span className="font-bold text-lg">
          Panel CMS - Alejandro Vicente Carpena
        </span>
      </div>

      <div className="flex">
        <button className="px-5 py-2 text-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all">
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
}
