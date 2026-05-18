import { NextRequest, NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";
  const lat = parseFloat(searchParams.get("lat") || "");
  const lng = parseFloat(searchParams.get("lng") || "");
  const limit = parseInt(searchParams.get("limit") || "30");

  const sql = neon(process.env.DATABASE_URL!);

  // If we have a query, search by name/category
  if (q) {
    const searchTerm = `%${q}%`;
    const results = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM professionals p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
        AND (
          p.name ILIKE ${searchTerm}
          OR c.name ILIKE ${searchTerm}
          OR p.address ILIKE ${searchTerm}
          OR p.neighborhood ILIKE ${searchTerm}
          OR p.city ILIKE ${searchTerm}
        )
      ORDER BY p.google_rating DESC NULLS LAST
      LIMIT ${limit}
    `;
    return NextResponse.json({ professionals: results, total: results.length });
  }

  // If we have coordinates, return nearby
  if (!isNaN(lat) && !isNaN(lng)) {
    if (category) {
      const results = await sql`
        SELECT p.*, c.name as category_name, c.slug as category_slug,
          (SELECT row_to_json(r) FROM (
            SELECT author_name, text, rating FROM reviews_imported
            WHERE professional_id = p.id AND text IS NOT NULL
            ORDER BY rating DESC LIMIT 1
          ) r) as top_review,
          (6371 * acos(least(1, greatest(-1,
            cos(radians(${lat})) * cos(radians(p.latitude)) *
            cos(radians(p.longitude) - radians(${lng})) +
            sin(radians(${lat})) * sin(radians(p.latitude))
          )))) AS distance_km
        FROM professionals p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.is_active = true
          AND c.slug = ${category}
          AND p.latitude IS NOT NULL
          AND p.longitude IS NOT NULL
        ORDER BY
          CASE
            WHEN (
              (6371 * acos(least(1, greatest(-1,
                cos(radians(${lat})) * cos(radians(p.latitude)) *
                cos(radians(p.longitude) - radians(${lng})) +
                sin(radians(${lat})) * sin(radians(p.latitude))
              )))) <= 10
              AND p.is_claimed = true
            ) THEN 0
            ELSE 1
          END,
          distance_km ASC
        LIMIT ${limit}
      `;
      return NextResponse.json({ professionals: results, total: results.length });
    }

    const results = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug,
        (6371 * acos(least(1, greatest(-1,
          cos(radians(${lat})) * cos(radians(p.latitude)) *
          cos(radians(p.longitude) - radians(${lng})) +
          sin(radians(${lat})) * sin(radians(p.latitude))
        )))) AS distance_km
      FROM professionals p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
        AND p.latitude IS NOT NULL
        AND p.longitude IS NOT NULL
      ORDER BY distance_km ASC
      LIMIT ${limit}
    `;
    return NextResponse.json({ professionals: results, total: results.length });
  }

  // If we have city name, filter by city
  if (city) {
    const cityTerm = `%${city}%`;
    const results = await sql`
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM professionals p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = true
        AND (p.city ILIKE ${cityTerm} OR p.address ILIKE ${cityTerm} OR p.state ILIKE ${cityTerm})
      ORDER BY p.google_rating DESC NULLS LAST
      LIMIT ${limit}
    `;
    return NextResponse.json({ professionals: results, total: results.length });
  }

  // Default: top rated
  const results = await sql`
    SELECT p.*, c.name as category_name, c.slug as category_slug
    FROM professionals p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.is_active = true
    ORDER BY p.google_rating DESC NULLS LAST
    LIMIT ${limit}
  `;
  return NextResponse.json({ professionals: results, total: results.length });
}
