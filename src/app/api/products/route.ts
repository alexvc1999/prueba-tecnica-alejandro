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
