import { NextResponse } from "next/server";

const API_BASE = "https://api.banidb.com/v2";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query parameter" }, { status: 400 });
  }

  try {
    const res = await fetch(`${API_BASE}/search/${encodeURIComponent(query)}`);
    
    if (!res.ok) {
      throw new Error("Search API failed");
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
