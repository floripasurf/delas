"use client";

import { useState, useEffect } from "react";
import ProfessionalCard from "@/app/components/professional-card";

interface Pro {
  id: string;
  name: string;
  slug: string;
  phone: string | null;
  address: string | null;
  neighborhood: string | null;
  city: string | null;
  google_rating: number | null;
  google_review_count: number;
  is_verified: boolean;
  is_claimed: boolean;
  photo_url: string | null;
  hours: string | null;
  latitude: number | null;
  longitude: number | null;
  distance_km?: number;
  top_review?: { author_name: string | null; text: string | null; rating: number | null } | null;
}

type SortMode = "nearby" | "rating" | "reviews";

function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function sortByProximity(list: Pro[], lat: number, lng: number) {
  const withDistance = list.map((p) => ({
    ...p,
    distance_km:
      p.latitude && p.longitude
        ? haversine(lat, lng, p.latitude, p.longitude)
        : 9999,
  }));

  // Claimed within 10km first, then nearby by distance, then far by distance
  return withDistance.sort((a, b) => {
    const aClose = (a.distance_km || 9999) <= 10;
    const bClose = (b.distance_km || 9999) <= 10;
    const aClaimed = a.is_claimed;
    const bClaimed = b.is_claimed;

    // Claimed + within 10km → top priority
    if (aClose && aClaimed && !(bClose && bClaimed)) return -1;
    if (bClose && bClaimed && !(aClose && aClaimed)) return 1;

    // Both claimed+close or both not: sort by distance
    if (aClose && bClose) {
      // Within 10km: claimed first, then by rating
      if (aClaimed !== bClaimed) return aClaimed ? -1 : 1;
      return (b.google_rating || 0) - (a.google_rating || 0);
    }

    // Otherwise sort by distance
    return (a.distance_km || 9999) - (b.distance_km || 9999);
  });
}

async function fetchNearbyByCategory(categorySlug: string, lat: number, lng: number): Promise<Pro[]> {
  const params = new URLSearchParams({
    category: categorySlug,
    lat: String(lat),
    lng: String(lng),
    radius: "15",
    limit: "100",
  });
  const response = await fetch(`/api/professionals/search?${params.toString()}`);

  if (!response.ok) {
    throw new Error("Failed to fetch nearby professionals");
  }

  const data = await response.json();
  return data.professionals || [];
}

export default function ProfessionalsList({
  professionals,
  categorySlug,
}: {
  professionals: Pro[];
  categorySlug: string;
}) {
  const [sortMode, setSortMode] = useState<SortMode>("nearby");
  const [currentList, setCurrentList] = useState<Pro[]>(professionals);
  const [sorted, setSorted] = useState<Pro[]>(professionals);
  const [geoStatus, setGeoStatus] = useState<"idle" | "loading" | "done" | "denied">("idle");
  const [userLoc, setUserLoc] = useState<{ lat: number; lng: number } | null>(null);

  // Default: try geolocation on load for proximity sort
  useEffect(() => {
    if (!navigator.geolocation) {
      setGeoStatus("denied");
      setSortMode("rating");
      setSorted(sortByRating(professionals));
      return;
    }

    setGeoStatus("loading");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLoc(loc);
        try {
          const nearby = await fetchNearbyByCategory(categorySlug, loc.lat, loc.lng);
          setCurrentList(nearby);
          setSorted(nearby);
          setGeoStatus("done");
        } catch {
          setCurrentList(professionals);
          setSorted(sortByProximity(professionals, loc.lat, loc.lng));
          setGeoStatus("done");
        }
      },
      () => {
        // Fallback to rating if geo denied
        setGeoStatus("denied");
        setSortMode("rating");
        setSorted(sortByRating(professionals));
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  }, [professionals, categorySlug]);

  function sortByRating(list: Pro[]) {
    return [...list].sort((a, b) => (b.google_rating || 0) - (a.google_rating || 0));
  }

  function sortByReviews(list: Pro[]) {
    return [...list].sort((a, b) => (b.google_review_count || 0) - (a.google_review_count || 0));
  }

  function handleSort(mode: SortMode) {
    setSortMode(mode);

    if (mode === "rating") {
      setSorted(sortByRating(currentList));
    } else if (mode === "reviews") {
      setSorted(sortByReviews(currentList));
    } else if (mode === "nearby") {
      if (userLoc) {
        setSorted(sortByProximity(currentList, userLoc.lat, userLoc.lng));
      } else {
        setGeoStatus("loading");
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            setUserLoc(loc);
            try {
              const nearby = await fetchNearbyByCategory(categorySlug, loc.lat, loc.lng);
              setCurrentList(nearby);
              setSorted(nearby);
              setGeoStatus("done");
            } catch {
              setCurrentList(professionals);
              setSorted(sortByProximity(professionals, loc.lat, loc.lng));
              setGeoStatus("done");
            }
          },
          () => {
            setGeoStatus("denied");
            setSortMode("rating");
          },
          { enableHighAccuracy: false, timeout: 10000 }
        );
      }
    }
  }

  return (
    <div>
      {/* Results count + Sort buttons */}
      <div className="flex items-center justify-between gap-2 mb-5 flex-wrap">
        <p className="text-sm text-gray-500 font-medium">
          {sorted.length} profissional{sorted.length !== 1 ? "is" : ""} encontrada{sorted.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400 mr-1">Ordenar:</span>
          {[
            { mode: "nearby" as SortMode, label: "Mais perto" },
            { mode: "rating" as SortMode, label: "Melhor avaliadas" },
            { mode: "reviews" as SortMode, label: "Mais avaliações" },
          ].map(({ mode, label }) => (
          <button
            key={mode}
            onClick={() => handleSort(mode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              sortMode === mode
                ? "bg-rose-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-rose-200 hover:text-rose-600"
            }`}
          >
            {mode === "nearby" && geoStatus === "loading" ? "Localizando..." : label}
          </button>
          ))}
        </div>
      </div>

      {geoStatus === "denied" && (
        <p className="text-xs text-red-500 mb-4">
          Não foi possível acessar sua localização. Permita o acesso e tente novamente.
        </p>
      )}

      {/* List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {sorted.map((pro) => (
          <ProfessionalCard key={pro.id} pro={pro} topReview={pro.top_review} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">Nenhum profissional encontrado nesta categoria ainda.</p>
          <p className="text-sm text-gray-400 mt-1">Estamos adicionando novos profissionais todos os dias.</p>
        </div>
      )}
    </div>
  );
}
