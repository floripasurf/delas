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
      <rect width="32" height="32" rx="9" fill="#F43F5E" />
      {/* Sparkle/glow */}
      <path
        d="M16 7L17.8 13.2L24 15L17.8 16.8L16 23L14.2 16.8L8 15L14.2 13.2L16 7Z"
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
        className="text-[1.2rem] font-bold tracking-[-0.03em] text-gray-900"
        style={{ fontFamily: "var(--font-brand), sans-serif" }}
      >
        gl
        <span className="relative">
          o
          <svg
            className="absolute -top-[2px] left-[3px] w-[5px] h-[5px]"
            viewBox="0 0 10 10"
            fill="none"
          >
            <circle cx="5" cy="5" r="5" fill="#F43F5E" />
          </svg>
        </span>
        w
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
          d="M16 7L17.8 13.2L24 15L17.8 16.8L16 23L14.2 16.8L8 15L14.2 13.2L16 7Z"
          fill="white"
          fillOpacity="0.95"
        />
      </svg>
      <span
        className="text-[1.2rem] font-bold tracking-[-0.03em] text-white"
        style={{ fontFamily: "var(--font-brand), sans-serif" }}
      >
        glow
      </span>
    </div>
  );
}
