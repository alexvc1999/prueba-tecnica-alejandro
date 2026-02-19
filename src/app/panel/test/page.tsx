"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";

export default function PanelPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => console.error("Error", err));
  }, []);

  return (
    <div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name.es} - {p.price}€
          </li>
        ))}
      </ul>
    </div>
  );
}
