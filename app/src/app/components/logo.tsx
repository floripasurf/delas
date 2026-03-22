export function LogoIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="9" fill="#E11D48" />
      {/* Heart + sparkle — community & beauty */}
      <path
        d="M16 25.5C16 25.5 6 19.5 6 13.5C6 10.5 8.5 8 11.5 8C13.3 8 15 9 16 10.5C17 9 18.7 8 20.5 8C23.5 8 26 10.5 26 13.5C26 19.5 16 25.5 16 25.5Z"
        fill="white"
        fillOpacity="0.95"
      />
    </svg>
  );
}

export function LogoFull({ className = "" }: { className?: string }) {
  return (
    <a href="/" className={`flex items-center gap-2 ${className}`}>
      <LogoIcon size={30} />
      <span
        className="text-[1.2rem] font-bold tracking-[-0.02em] text-gray-900"
        style={{ fontFamily: "var(--font-brand), sans-serif" }}
      >
        delas
        <span className="text-rose-500">.club</span>
      </span>
    </a>
  );
}

export function LogoFullWhite({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg
        width={30}
        height={30}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="9" fill="white" fillOpacity="0.15" />
        <path
          d="M16 25.5C16 25.5 6 19.5 6 13.5C6 10.5 8.5 8 11.5 8C13.3 8 15 9 16 10.5C17 9 18.7 8 20.5 8C23.5 8 26 10.5 26 13.5C26 19.5 16 25.5 16 25.5Z"
          fill="white"
          fillOpacity="0.95"
        />
      </svg>
      <span
        className="text-[1.2rem] font-bold tracking-[-0.02em] text-white"
        style={{ fontFamily: "var(--font-brand), sans-serif" }}
      >
        delas<span className="text-rose-200">.club</span>
      </span>
    </div>
  );
}
