import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const timeline = [
  {
    type: "work",
    title: "Senior ML Engineer",
    org: "TechCorp AI",
    period: "2023 – Present",
    desc: "Leading the ML platform team. Building scalable inference pipelines and LLM-based products.",
  },
  {
    type: "work",
    title: "ML Engineer",
    org: "DataFlow Inc.",
    period: "2021 – 2023",
    desc: "Developed computer vision models for autonomous systems. Reduced inference latency by 40%.",
  },
  {
    type: "edu",
    title: "M.S. Computer Science (AI)",
    org: "Stanford University",
    period: "2019 – 2021",
    desc: "Research focus on NLP and reinforcement learning. Published 3 papers in top-tier conferences.",
  },
  {
    type: "work",
    title: "Data Scientist",
    org: "Analytics Pro",
    period: "2018 – 2019",
    desc: "Built predictive models for customer churn. Implemented A/B testing framework.",
  },
  {
    type: "edu",
    title: "B.S. Computer Science",
    org: "UC Berkeley",
    period: "2014 – 2018",
    desc: "Dean's List. Focused on algorithms, statistics, and machine learning fundamentals.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium mb-2">My journey</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experience & Education</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex items-start mb-10 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-primary glow-ring -translate-x-1/2 mt-1.5 z-10" />

              {/* Content */}
              <div className={`ml-14 md:ml-0 md:w-[45%] ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <div className="glass rounded-xl p-5 neon-border hover:bg-card/80 transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2 justify-start md:justify-end">
                    {item.type === "work" ? (
                      <Briefcase size={16} className="text-primary" />
                    ) : (
                      <GraduationCap size={16} className="text-primary" />
                    )}
                    <span className="text-xs text-muted-foreground">{item.period}</span>
                  </div>
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-primary mb-2">{item.org}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
