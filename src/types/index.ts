export interface Product {
  id: string;
  name: { es: string; en: string };
  price: number;
  categoryId: string;
}

export interface Category {
  id: string;
  name: { es: string; en: string };
}
