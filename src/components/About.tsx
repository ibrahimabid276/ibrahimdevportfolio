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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding gradient-bg" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium mb-2">Get to know me</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-muted-foreground leading-relaxed">
              I'm Syed Ibrahim, an AI/ML enthusiast and Python developer based in Lahore.
              I specialize in building intelligent applications using CrewAI, Streamlit, and
              modern AI frameworks.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              My work ranges from AI-powered cold email generators and fitness planners to
              interactive story book creators and RAG-based Q&A systems. I love exploring
              how multi-agent AI can solve real-world problems.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I'm always learning and building — whether it's experimenting with new AI models,
              creating fun Python games, or contributing to open-source projects on GitHub.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {highlights.map(({ icon: Icon, label, desc }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                className="glass rounded-xl p-5 neon-border hover:bg-card/80 transition-all duration-300 group"
              >
                <Icon
                  size={28}
                  className="text-primary mb-3 group-hover:drop-shadow-[0_0_8px_hsl(142_71%_45%/0.5)] transition-all"
                />
                <h3 className="font-semibold text-sm mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
