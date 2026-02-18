import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET() {
  try {
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: "Error al obtener productos" });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name?.es || !body.name?.en || body.price <= 0) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }

    const newProduct = {
      ...body,
      id: Math.random().toString(36).substr(2, 9),
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error al crear producto" });
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const { id, name, price, categoryId } = body;

  const index = products.findIndex((p) => p.id === id);
  if (index !== -1) {
    products[index] = { id, name, price, categoryId };
    return NextResponse.json(products[index]);
  }
  return NextResponse.json({ error: "No encontrado" }, { status: 404 });
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
