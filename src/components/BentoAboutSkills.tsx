import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Database, Lightbulb, Cpu, Wrench } from "lucide-react";

const highlights = [
  { icon: Brain, label: "AI & CrewAI", desc: "Multi-agent AI systems" },
  { icon: Code, label: "Python Dev", desc: "Streamlit, FastAPI, Flask" },
  { icon: Database, label: "RAG Systems", desc: "Retrieval-augmented generation" },
  { icon: Lightbulb, label: "Problem Solver", desc: "Creative AI solutions" },
];

const skillCategories = [
  {
    title: "AI / Machine Learning",
    icon: Cpu,
    skills: [
      { name: "AI Agents (CrewAI)", level: 95 },
      { name: "Prompt Engineering", level: 92 },
      { name: "LLM Integration", level: 90 },
      { name: "NLP Basics", level: 85 },
      { name: "RAG Systems", level: 90 },
    ],
  },
  {
    title: "Programming",
    icon: Code,
    skills: [
      { name: "Python", level: 95 },
      { name: "API Integration", level: 90 },
      { name: "Automation Scripting", level: 92 },
      { name: "Basic JavaScript", level: 75 },
      { name: "SQL (Basic)", level: 70 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Streamlit", level: 95 },
      { name: "CrewAI", level: 95 },
      { name: "OpenRouter / OpenAI APIs", level: 90 },
      { name: "LangChain / ChromaDB", level: 88 },
      { name: "Git / GitHub", level: 85 },
    ],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
});

const BentoAboutSkills = () => {
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
          <p className="text-primary text-sm font-medium font-mono mb-2">{"// about & skills"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">Who I Am & What I Do</h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-auto">
          {/* About Card - spans 2 cols */}
          <motion.div
            {...(isInView ? fadeUp(0.1) : { initial: { opacity: 0 } })}
            animate={isInView ? fadeUp(0.1).animate : {}}
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

          {/* Highlight cards - 2x2 grid in right side */}
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

          {/* Skills Cards - each spans different sizes */}
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + ci * 0.15, duration: 0.6 }}
              className={`glass rounded-2xl p-6 neon-border hover:bg-card/80 transition-all duration-500 ${
                ci === 0 ? "lg:col-span-2" : "lg:col-span-1"
              }`}
            >
              <div className="flex items-center gap-3 mb-5">
                <cat.icon size={20} className="text-primary" />
                <h3 className="text-base font-semibold neon-text">{cat.title}</h3>
              </div>
              <div className="space-y-4">
                {cat.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-secondary-foreground text-xs">{skill.name}</span>
                      <span className="text-muted-foreground font-mono text-xs">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.4 + ci * 0.15 + si * 0.06, duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                        style={{ boxShadow: "0 0 8px hsl(142 71% 45% / 0.3)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoAboutSkills;
