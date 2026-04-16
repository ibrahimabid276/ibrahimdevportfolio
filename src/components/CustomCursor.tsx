import { useEffect, useState, useCallback, useRef } from "react";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const HAND_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1"/>
      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2"/>
      <feMerge>
        <feMergeNode in="blur2"/>
        <feMergeNode in="blur1"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <g filter="url(#neonGlow)" fill="none" stroke="STROKE_COLOR" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <!-- Index finger -->
    <path d="M28 8 C28 4, 34 4, 34 8 L34 24 L28 24 Z"/>
    <!-- Middle finger -->
    <path d="M36 6 C36 2, 42 2, 42 6 L42 24 L36 24 Z"/>
    <!-- Ring finger -->
    <path d="M44 10 C44 6, 50 6, 50 10 L50 26 L44 26 Z"/>
    <!-- Pinky -->
    <path d="M52 16 C52 12, 58 12, 58 16 L58 30 L52 30 Z"/>
    <!-- Thumb -->
    <path d="M22 26 C16 22, 14 18, 18 14 C22 10, 26 14, 26 18 L26 26"/>
    <!-- Palm -->
    <path d="M26 24 L26 40 C26 48, 34 54, 42 54 C50 54, 58 48, 58 40 L58 30"/>
    <line x1="28" y1="24" x2="28" y2="24"/>
  </g>
</svg>
`;

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);

  const handleClick = useCallback((e: MouseEvent) => {
    const id = ++rippleId.current;
    setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        "a, button, [role='button'], input, textarea, .cursor-hover"
      );
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("click", handleClick);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("click", handleClick);
      observer.disconnect();
    };
  }, [handleClick]);

  if (!visible) return null;

  const normalColor = "#4ade80";
  const hoverColor = "#22d3ee";
  const strokeColor = hovering ? hoverColor : normalColor;
  const svgEncoded = encodeURIComponent(HAND_SVG.replace(/STROKE_COLOR/g, strokeColor));
  const scale = hovering ? 1.2 : 1;
  const glowColor = hovering
    ? "0 0 16px #22d3ee, 0 0 40px #22d3ee80"
    : "0 0 12px #4ade80, 0 0 30px #4ade8060";

  return (
    <>
      {/* Hand cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 99999,
          transform: `translate(${pos.x - 20}px, ${pos.y - 4}px) scale(${scale})`,
          transition: hovering ? "transform 0.1s ease-out" : "transform 0.05s linear",
          width: 48,
          height: 48,
          filter: `drop-shadow(${glowColor.split(",")[0].replace("0 0", "0 0")})`,
          animation: "cursorPulse 3s ease-in-out infinite",
        }}
      >
        <img
          src={`data:image/svg+xml,${svgEncoded}`}
          alt=""
          width={48}
          height={48}
          style={{ display: "block" }}
        />
      </div>

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="fixed pointer-events-none"
          style={{
            zIndex: 99998,
            left: ripple.x,
            top: ripple.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                border: `2px solid ${normalColor}`,
                animation: `cursorRipple 0.7s ${i * 0.1}s ease-out forwards`,
                opacity: 0,
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default CustomCursor;
