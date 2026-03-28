"use client";

import { useState } from "react";

interface Photo {
  id: string;
  url: string;
  caption: string | null;
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Portfólio ({photos.length})
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              onClick={() => setSelectedIndex(i)}
              className="aspect-square rounded-lg overflow-hidden bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2"
            >
              <img
                src={photo.url}
                alt={photo.caption || "Foto do trabalho"}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute -top-10 right-0 text-white/80 hover:text-white text-sm font-medium"
            >
              Fechar
            </button>

            {/* Image */}
            <img
              src={photos[selectedIndex].url}
              alt={photos[selectedIndex].caption || "Foto do trabalho"}
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />

            {/* Caption */}
            {photos[selectedIndex].caption && (
              <p className="text-white/80 text-sm text-center mt-3">
                {photos[selectedIndex].caption}
              </p>
            )}

            {/* Navigation */}
            {photos.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(
                      selectedIndex === 0 ? photos.length - 1 : selectedIndex - 1
                    );
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-lg transition-colors -ml-2"
                >
                  ‹
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(
                      selectedIndex === photos.length - 1 ? 0 : selectedIndex + 1
                    );
                  }}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white text-lg transition-colors -mr-2"
                >
                  ›
                </button>
              </div>
            )}

            {/* Counter */}
            <p className="text-white/60 text-xs text-center mt-2">
              {selectedIndex + 1} / {photos.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
