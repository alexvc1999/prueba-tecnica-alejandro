"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

export default function PanelPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError(false);

    try {
      const [prodRes, catRes] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      setProducts(await prodRes.json());
      setCategories(await catRes.json());
    } catch (err) {
      console.error("Error al cargar datos:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.name[language as keyof typeof found.name] : "-";
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === "es" ? "¿Eliminar producto?" : "Delete product?"))
      return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  const filteredProducts = products.filter((product) => {
    const productName = product.name[language].toLowerCase();
    return productName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-8 max-w-6xl mx-auto">
        <header className="flex flex-row justify-between items-start gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold">
              {language === "es" ? "Catálogo" : "Catalog"}
            </h1>
          </div>

          <div className="flex flex-row w-auto gap-4">
            <input
              type="text"
              placeholder={
                language === "es" ? "Buscar producto..." : "Search product..."
              }
              className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl w-full sm:w-64 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <button
              onClick={() => setError(true)}
              className="flex items-center text-m font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 px-5 py-2 rounded-lg transition-all"
            >
              {language === "es" ? "Simular Error" : "Simulate Error"}
            </button>

            <Link
              href="/panel/create"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all text-center"
            >
              {language === "es" ? "+ Nuevo" : "+ New"}
            </Link>
          </div>
        </header>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-red-50 border border-red-100 rounded-3xl">
            <p className="text-red-600 font-bold mb-4">
              {language === "es"
                ? "Ha ocurrido un error inesperado"
                : "An unexpected error occurred"}
            </p>
            <button
              onClick={fetchData}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
            >
              {language === "es" ? "Reintentar" : "Retry"}
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-400 ">
              {searchTerm
                ? language === "es"
                  ? `No hay resultados para "${searchTerm}"`
                  : `No results for "${searchTerm}"`
                : language === "es"
                  ? "Sin productos"
                  : "No products"}
            </p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold">
                <tr>
                  <th className="px-6 py-4 text-left">
                    {language === "es" ? "PRODUCTO" : "PRODUCT"}
                  </th>
                  <th className="px-6 py-4 text-left">
                    {language === "es" ? "CATEGORIA" : "CATEGORY"}
                  </th>
                  <th className="px-6 py-4 text-left">
                    {language === "es" ? "PRECIO" : "PRICE"}
                  </th>
                  <th className="px-6 py-4 text-right">
                    {language === "es" ? "ACCIONES" : "ACTIONS"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                      {product.name[language as keyof typeof product.name]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {getCategoryName(product.categoryId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {product.price.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/panel/edit/${product.id}`}
                          className="px-5 py-2 font-bold text-blue-500 bg-blue-50 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all"
                        >
                          {language === "es" ? "Editar" : "Edit"}
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="px-5 py-2 font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all"
                        >
                          {language === "es" ? "Eliminar" : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
