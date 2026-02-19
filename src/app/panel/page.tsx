import Navbar from "@/components/Navbar";

export default function PanelPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">Catálogo</h1>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all text-center">
              + Nuevo
            </button>
          </div>
        </header>

        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
              <tr>
                <th className="px-6 py-4 text-left tracking-wider">Producto</th>
                <th className="px-6 py-4 text-left tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-4 text-left tracking-wider">Precio</th>
                <th className="px-6 py-4 text-right tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  Zapatillas
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Calzado</td>
                <td className="px-6 py-4 text-sm text-slate-600">89,99 €</td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex justify-end gap-4">
                    <button className="px-5 py-2 font-bold text-blue-500 bg-blue-50 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all">
                      Editar
                    </button>

                    <button className="px-5 py-2 text-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>

              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                  Camiseta
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">Ropa</td>
                <td className="px-6 py-4 text-sm text-slate-600">15,50 €</td>
                <td className="px-6 py-4 text-right text-sm">
                  <div className="flex justify-end gap-4">
                    <button className="px-5 py-2 font-bold text-blue-500 bg-blue-50 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all">
                      Editar
                    </button>

                    <button className="px-5 py-2 text-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all">
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
