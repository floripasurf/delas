import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

// IndexNow API — instant indexing for Bing, Yandex, etc.
// Call this endpoint after importing new professionals
export async function POST() {
  const sql = neon(process.env.DATABASE_URL!);

  // Get recently updated professional URLs
  const pros = await sql`
    SELECT slug FROM professionals
    WHERE is_active = true
    ORDER BY updated_at DESC
    LIMIT 100
  `;

  const categories = await sql`SELECT slug FROM categories`;

  const urls = [
    "https://delas.club",
    "https://delas.club/para-profissionais",
    "https://delas.club/buscar",
    ...categories.map((c) => `https://delas.club/categoria/${c.slug}`),
    ...pros.map((p) => `https://delas.club/profissional/${p.slug}`),
  ];

  // IndexNow key
  const key = "delas-indexnow-key-2026";

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "delas.club",
        key,
        keyLocation: `https://delas.club/${key}.txt`,
        urlList: urls.slice(0, 10000),
      }),
    });

    return NextResponse.json({
      success: true,
      status: res.status,
      urlsSubmitted: urls.length,
    });
  } catch (e: unknown) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
