"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { Category, Product } from "@/types";
import Navbar from "@/components/Navbar";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { language } = useLanguage();
  const router = useRouter();

  const [form, setForm] = useState({
    nameEs: "",
    nameEn: "",
    price: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          fetch("/api/categories"),
          fetch("/api/products"),
        ]);
        const cats = await catRes.json();
        const prods = await prodRes.json();
        setCategories(cats);

        const product = prods.find((p: Product) => p.id === id);
        if (product) {
          setForm({
            nameEs: product.name.es,
            nameEn: product.name.en,
            price: String(product.price),
            categoryId: product.categoryId,
          });
        }
      } catch (error) {
        console.error(error);
        setError(language === "es" ? "Error al cargar" : "Error loading");
      }
    };
    fetchData();
  }, [id, language]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.nameEs.trim() || !form.nameEn.trim())
      return setError(
        language === "es" ? "Nombre obligatorio" : "Name required",
      );

    const priceNum = Number(form.price);
    if (!form.price || isNaN(priceNum) || priceNum <= 0)
      return setError(language === "es" ? "Precio > 0" : "Price > 0");

    setSubmitting(true);
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        name: { es: form.nameEs, en: form.nameEn },
        price: priceNum,
        categoryId: form.categoryId,
      }),
    });
    router.push("/panel");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <main className="max-w-2xl mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">
          {language === "es" ? "Editar Producto" : "Edit Product"}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-slate-200 rounded-2xl p-8 space-y-5 shadow-sm"
        >
          {error && (
            <p className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </p>
          )}

          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm">Nombre (ES)</span>
              <input
                type="text"
                value={form.nameEs}
                onChange={(e) => setForm({ ...form, nameEs: e.target.value })}
                className="border border-slate-200 rounded-xl p-3 outline-none"
              />
            </label>
            <label className="flex flex-col gap-1">
              <span className="text-sm">Name (EN)</span>
              <input
                type="text"
                value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                className="border border-slate-200 rounded-xl p-3 outline-none"
              />
            </label>
          </div>

          <label className="flex flex-col gap-1">
            <span className="text-sm">
              {language === "es" ? "Precio (€)" : "Price ($)"}
            </span>
            <input
              type="number"
              step="0.01"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="border border-slate-200 rounded-xl p-3 outline-none"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm">
              {language === "es" ? "Categoría" : "Category"}
            </span>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="border border-slate-200 rounded-xl p-3 bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name[language]}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => router.push("/panel")}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
            >
              {language === "es" ? "Cancelar" : "Cancel"}
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-blue-600 text-white rounded-xl disabled:opacity-50"
            >
              {submitting ? "..." : language === "es" ? "Actualizar" : "Update"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
