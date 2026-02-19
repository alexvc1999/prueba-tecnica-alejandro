import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener productos" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name?.es || !body.name?.en || body.price <= 0) {
      return NextResponse.json({ error: "Datos no validos" }, { status: 400 });
    }

    const newProduct = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al crear producto" });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    return NextResponse.json({ message: "Eliminado" });
  }
  return NextResponse.json({ error: "No encontrado" }, { status: 404 });
}
