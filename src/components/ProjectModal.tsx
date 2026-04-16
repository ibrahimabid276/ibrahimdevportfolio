import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ProjectDetail {
  title: string;
  problem: string;
  solution: string;
  metrics: string[];
  tags: string[];
}

interface Props {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: Props) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      {project && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg glass border-l border-primary/20 overflow-y-auto"
          >
            <div className="p-8">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 p-2 rounded-lg hover:bg-muted transition-colors"
              >
                <X size={20} className="text-muted-foreground" />
              </button>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-bold mb-8 neon-text">{project.title}</h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">// Problem</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.problem}</p>
                </div>

                <div className="h-px bg-border/50" />

                <div>
                  <h3 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">// Solution</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{project.solution}</p>
                </div>

                <div className="h-px bg-border/50" />

                <div>
                  <h3 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">// Key Metrics</h3>
                  <div className="space-y-3">
                    {project.metrics.map((m, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span className="text-sm text-muted-foreground">{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={project.tags.includes("github") ? "#" : "#"}
                className="mt-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:shadow-[0_0_30px_hsl(142_71%_45%/0.3)] transition-all duration-300"
              >
                View on GitHub
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
