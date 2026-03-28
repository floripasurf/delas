"use client";

import Link from "next/link";

interface FeaturedPro {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  city: string | null;
  google_rating: number | null;
  google_review_count: number;
  is_verified: boolean;
  is_claimed: boolean;
  photo_url: string | null;
  category_name: string | null;
}

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default function FeaturedProfessionals({
  professionals,
}: {
  professionals: FeaturedPro[];
}) {
  if (professionals.length === 0) return null;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {professionals.map((pro) => (
        <Link
          key={pro.id}
          href={`/profissional/${pro.slug}`}
          className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-rose-200 hover:shadow-md transition-all group"
        >
          {/* Photo */}
          <div className="relative aspect-[4/3] bg-gray-100">
            {pro.photo_url ? (
              <img
                src={pro.photo_url}
                alt={pro.name}
                className="w-full h-full object-cover group-hover:brightness-95 transition-all"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white/90">
                  {getInitials(pro.name)}
                </span>
              </div>
            )}
            {(pro.is_claimed || pro.is_verified) && (
              <span className="absolute top-2 left-2 bg-rose-600 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Verificada
              </span>
            )}
            {pro.google_rating && (
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-lg flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs font-semibold text-gray-800">{pro.google_rating}</span>
                <span className="text-[10px] text-gray-500">({pro.google_review_count})</span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-3">
            <h3 className="font-semibold text-gray-900 text-sm truncate group-hover:text-rose-600 transition-colors">
              {pro.name}
            </h3>
            <p className="text-xs text-gray-400 truncate">
              {pro.category_name}
              {pro.city ? ` · ${pro.city}` : ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
