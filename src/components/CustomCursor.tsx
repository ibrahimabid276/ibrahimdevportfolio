import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };

    const addHoverListeners = () => {
      const interactives = document.querySelectorAll("a, button, [role='button'], input, textarea, .cursor-hover");
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", () => setHovering(true));
        el.addEventListener("mouseleave", () => setHovering(false));
      });
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", () => setVisible(false));
    document.addEventListener("mouseenter", () => setVisible(true));

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", move);
      observer.disconnect();
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
        animate={{
          x: pos.x - (hovering ? 24 : 10),
          y: pos.y - (hovering ? 24 : 10),
          width: hovering ? 48 : 20,
          height: hovering ? 48 : 20,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          borderRadius: "50%",
          border: "1.5px solid hsla(142, 71%, 45%, 0.8)",
          backgroundColor: hovering ? "hsla(142, 71%, 45%, 0.1)" : "transparent",
        }}
      />
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "hsl(142, 71%, 45%)",
        }}
      />
    </>
  );
};

export default CustomCursor;
