import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Cpu, Wrench } from "lucide-react";

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

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium font-mono mb-2">{"// skills"}</p>
          <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + ci * 0.15, duration: 0.6 }}
              className="glass rounded-2xl p-6 neon-border hover:bg-card/80 transition-all duration-500"
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
                        transition={{ delay: 0.3 + ci * 0.15 + si * 0.06, duration: 0.8, ease: "easeOut" }}
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

export default Skills;
