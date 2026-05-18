import type { Metadata } from "next";

export const SITE_URL = "https://delas.club";
export const SITE_NAME = "Delas Club";
export const DEFAULT_OG_IMAGE = "/logo.svg";

export function absoluteUrl(path = "/") {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function canonical(path = "/"): Metadata["alternates"] {
  return {
    canonical: absoluteUrl(path),
  };
}

export function sharedOpenGraph({
  title,
  description,
  path,
  type = "website",
  images,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  images?: string[];
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url: absoluteUrl(path),
    siteName: SITE_NAME,
    locale: "pt_BR",
    type,
    images: (images?.length ? images : [DEFAULT_OG_IMAGE]).map((url) => ({
      url: absoluteUrl(url),
      alt: title,
    })),
  };
}

export function sharedTwitter(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
  };
}

export function slugifyCity(city: string, state: string | null) {
  const slug = city
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[àáâãä]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return state ? `${slug}-${state.toLowerCase()}` : slug;
}

export function isIndexableCity(city: string | null) {
  if (!city) return false;
  const normalized = city.trim().toLowerCase();
  if (normalized.length < 3) return false;
  if (/^\d+$/.test(normalized)) return false;
  if (/^(s\/n|qd|quadra|lt|lote|loja|rua|avenida|av\.?|n[°º]?|numero|parque)$/i.test(normalized)) {
    return false;
  }
  if (/^\d+\s*-/.test(normalized)) return false;
  if (/^qd\.?\s*\d+/i.test(normalized)) return false;
  return true;
}
