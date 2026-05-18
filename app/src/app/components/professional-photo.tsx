"use client";

import { useEffect, useState } from "react";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function isStaleGooglePhotoUrl(src: string | null): boolean {
  return Boolean(
    src?.startsWith("https://lh3.googleusercontent.com/gps-cs-s/AHVA")
  );
}

export default function ProfessionalPhoto({
  name,
  src,
  className,
  fallbackClassName,
  initialsClassName = "text-2xl font-bold text-white/90",
}: {
  name: string;
  src: string | null;
  className: string;
  fallbackClassName: string;
  initialsClassName?: string;
}) {
  const [failed, setFailed] = useState(false);
  const usableSrc = isStaleGooglePhotoUrl(src) ? null : src;
  const shouldShowImage = usableSrc && !failed;

  useEffect(() => {
    setFailed(false);
  }, [usableSrc]);

  if (shouldShowImage) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={usableSrc}
        alt={name}
        className={className}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div className={fallbackClassName}>
      <span className={initialsClassName}>{getInitials(name)}</span>
    </div>
  );
}
