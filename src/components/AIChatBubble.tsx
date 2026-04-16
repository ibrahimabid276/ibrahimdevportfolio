import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const AIChatBubble = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-80 glass rounded-2xl neon-border overflow-hidden"
          >
            <div className="p-4 border-b border-border/30">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold">AI Assistant</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">Ask me about Ibrahim's work</p>
            </div>
            <div className="p-4 h-52 overflow-y-auto">
              <div className="glass rounded-xl p-3 text-xs text-muted-foreground leading-relaxed">
                👋 Hi! I'm Ibrahim's AI assistant. I can tell you about his projects, skills, or how to get in touch. What would you like to know?
              </div>
            </div>
            <div className="p-3 border-t border-border/30 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything..."
                className="flex-1 px-3 py-2 rounded-lg bg-muted border border-border/50 text-sm text-foreground focus:outline-none focus:border-primary/50"
              />
              <button className="p-2 rounded-lg bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(142_71%_45%/0.3)] transition-all">
                <Send size={14} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(!open)}
        className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:shadow-[0_0_30px_hsl(142_71%_45%/0.4)] transition-all duration-300"
      >
        {/* Pulse rings */}
        <span className="absolute inset-0 rounded-full animate-ping bg-primary/20" />
        <span className="absolute inset-[-4px] rounded-full animate-pulse-ring" />
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>
    </div>
  );
};

export default AIChatBubble;
