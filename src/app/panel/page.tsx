"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import { Product, Category } from "@/types";
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
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productName = product.name[language].toLowerCase();
    return productName.includes(searchTerm.toLowerCase());
  });

  const formatCurrency = (price: number) => {
    return new Intl.NumberFormat(language === "es" ? "es-ES" : "en-US", {
      style: "currency",
      currency: "EUR",
    }).format(price);
  };

  const getCategoryName = (id: string) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name[language] : "---";
  };

  const handleDelete = async (id: string) => {
    if (!confirm(language === "es" ? "¿Eliminar producto?" : "Delete product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="p-8 max-w-6xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
              {language === "es" ? "Catálogo" : "Catalog"}
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
            <div className="relative group">
              <input
                type="text"
                placeholder={
                  language === "es" ? "Buscar producto..." : "Search product..."
                }
                className="pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl w-full sm:w-64 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

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
              {language === "es" ? "Ha ocurrido un error inesperado" : "An unexpected error occurred"}
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
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase">
                <tr>
                  <th className="px-6 py-4 text-left tracking-wider">
                    {language === "es" ? "Producto" : "Product"}
                  </th>
                  <th className="px-6 py-4 text-left tracking-wider">
                    {language === "es" ? "Categoría" : "Category"}
                  </th>
                  <th className="px-6 py-4 text-left tracking-wider">
                    {language === "es" ? "Precio" : "Price"}
                  </th>
                  <th className="px-6 py-4 text-right tracking-wider">
                    {language === "es" ? "Acciones" : "Actions"}
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
                      {product.name[language]}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {getCategoryName(product.categoryId)}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {formatCurrency(product.price)}
                    </td>
                    <td className="px-6 py-4 text-right text-sm">
                      <div className="flex justify-end gap-4">
                        <Link
                          href={`/panel/edit/${product.id}`}
                          className="text-blue-600 hover:text-blue-800 font-bold"
                        >
                          {language === "es" ? "Editar" : "Edit"}
                        </Link>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-700 font-bold"
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
