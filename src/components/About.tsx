import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Database, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI & CrewAI", desc: "Multi-agent AI systems" },
  { icon: Code, label: "Python Developer", desc: "Streamlit, FastAPI, Flask" },
  { icon: Database, label: "RAG Systems", desc: "Retrieval-augmented generation" },
  { icon: Lightbulb, label: "Problem Solver", desc: "Creative AI solutions" },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-primary text-sm font-medium font-mono mb-3">Get to know me</p>
          <h2 className="text-5xl md:text-6xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed text-base">
              I'm <span className="text-foreground font-medium">Syed Ibrahim</span>, an AI/ML enthusiast and Python developer based in Lahore.
              I specialize in building intelligent applications using CrewAI, Streamlit, and modern AI frameworks.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              My work ranges from AI-powered cold email generators and fitness planners to interactive story book creators
              and RAG-based Q&A systems. I love exploring how multi-agent AI can solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed text-base">
              I'm always learning and building — whether it's experimenting with new AI models, creating fun Python games,
              or contributing to open-source projects on GitHub.
            </p>
          </motion.div>

          {/* Right: 2x2 highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 neon-border hover:bg-card/80 transition-all duration-500 group"
              >
                <Icon
                  size={32}
                  className="text-primary mb-5 group-hover:drop-shadow-[0_0_12px_hsl(142_71%_45%/0.6)] transition-all duration-300"
                />
                <h3 className="font-semibold text-base mb-1">{label}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
