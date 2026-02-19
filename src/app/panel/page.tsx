"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";
import { Product, Category } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

export default function PanelPage() {
  const { language } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/categories"),
        ]);

        setProducts(await prodRes.json());
        setCategories(await catRes.json());
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId: string) => {
    const found = categories.find((c) => c.id === categoryId);
    return found ? found.name[language] : "-";
  };

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
            <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:bg-blue-700 transition-all text-center">
              {language === "es" ? "+ Nuevo" : "+ New"}
            </button>
          </div>
        </header>

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
              {products.map((product) => (
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
                    {product.price.toFixed(2)} €
                  </td>
                  <td className="px-6 py-4 text-right text-sm">
                    <div className="flex justify-end gap-4">
                      <button className="px-5 py-2 font-bold text-blue-500 bg-blue-50 hover:text-blue-700 hover:bg-blue-100 rounded-lg transition-all">
                        {language === "es" ? "Editar" : "Edit"}
                      </button>
                      <button className="px-5 py-2 font-bold text-red-500 bg-red-50 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all">
                        {language === "es" ? "Eliminar" : "Delete"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
