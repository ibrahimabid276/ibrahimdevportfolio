import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(100, ((t - start) / duration) * 100);
      setProgress(p);
      if (p < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100000] flex items-center justify-center bg-background transition-opacity duration-500 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={done}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Neon ring */}
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 rounded-full border border-primary/20" />
          <div
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
            style={{ boxShadow: "0 0 20px hsl(var(--primary) / 0.6), inset 0 0 20px hsl(var(--primary) / 0.3)" }}
          />
          <div className="absolute inset-0 flex items-center justify-center font-mono text-primary text-sm neon-text">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* Name */}
        <div className="text-center">
          <div className="font-mono text-xs tracking-[0.4em] text-muted-foreground mb-2">
            INITIALIZING
          </div>
          <div className="text-2xl font-bold neon-text">SYED IBRAHIM</div>
        </div>

        {/* Progress bar */}
        <div className="w-56 h-[2px] bg-border/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-[width] duration-75"
            style={{
              width: `${progress}%`,
              boxShadow: "0 0 10px hsl(var(--primary)), 0 0 20px hsl(var(--primary) / 0.6)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
