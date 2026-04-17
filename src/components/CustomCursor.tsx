import { useEffect, useState, useCallback, useRef } from "react";
import cursorImg from "@/assets/neon-cursor.png";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const CustomCursor = () => {
  const isCoarse = typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches;
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(!isCoarse);
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
    if (isCoarse) return;

    // Hide native cursor immediately
    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

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
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
    };
  }, [handleClick, isCoarse]);

  if (isCoarse) return null;

  const scale = hovering ? 1.2 : 1;
  const size = 36;

  return (
    <>
      {/* Neon arrow cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          zIndex: 99999,
          transform: `translate(${pos.x - 4}px, ${pos.y - 2}px) scale(${scale})`,
          transformOrigin: "top left",
          transition: hovering ? "transform 0.12s ease-out" : "transform 0.04s linear",
          width: size,
          height: size,
          animation: "cursorPulse 3s ease-in-out infinite",
        }}
      >
        <img
          src={cursorImg}
          alt=""
          width={size}
          height={size}
          style={{ display: "block", width: size, height: size }}
          draggable={false}
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
                border: `2px solid #4ade80`,
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
