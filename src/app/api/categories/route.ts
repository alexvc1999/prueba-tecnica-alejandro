import { NextResponse } from "next/server";
import { categories } from "@/data/categories";

export async function GET() {
  try {
    return NextResponse.json(categories);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error al obtener categorias" });
  }
}
