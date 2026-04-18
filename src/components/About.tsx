import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Database, Lightbulb } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI & CrewAI", desc: "Multi-agent AI systems" },
  { icon: Code, label: "Python Dev", desc: "Streamlit, FastAPI, Flask" },
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
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium font-mono mb-2">{"// about"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Who I Am</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 glass rounded-2xl p-8 neon-border group hover:bg-card/80 transition-all duration-500"
          >
            <h3 className="text-xl font-semibold mb-4 neon-text">About Me</h3>
            <div className="space-y-3">
              <p className="text-muted-foreground leading-relaxed text-sm">
                I'm <span className="text-foreground font-medium">Syed Ibrahim</span>, an AI/ML enthusiast and Python developer based in Lahore.
                I specialize in building intelligent applications using CrewAI, Streamlit, and modern AI frameworks.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                My work ranges from AI-powered cold email generators and fitness planners to
                interactive story creators and RAG-based Q&A systems.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I'm always learning and building — experimenting with new AI models,
                creating Python games, and contributing to open-source projects.
              </p>
            </div>
          </motion.div>

          {highlights.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="glass rounded-2xl p-6 neon-border hover:bg-card/80 transition-all duration-500 group flex flex-col justify-between"
            >
              <Icon
                size={32}
                className="text-primary mb-4 group-hover:drop-shadow-[0_0_12px_hsl(142_71%_45%/0.6)] transition-all duration-300"
              />
              <div>
                <h3 className="font-semibold text-sm mb-1">{label}</h3>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
