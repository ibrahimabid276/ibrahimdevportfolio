import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "ColdMailAI",
    desc: "An AI-powered tool that analyzes a target company's website, identifies key areas for improvement, and automatically drafts personalized, professional cold emails that get results.",
    tags: ["Python", "CrewAI", "LLM", "Web Scraping"],
    github: "https://github.com/ibrahimabid276/ColdMailAI",
  },
  {
    title: "AI Story Book Creator",
    desc: "An AI-powered web app that generates personalized kids' stories based on user input like hero name, story type, power, and location. Built with Streamlit and CrewAI.",
    tags: ["Python", "Streamlit", "CrewAI", "AI"],
    github: "https://github.com/ibrahimabid276/My-Story-Book-Creator-Streamlit-",
  },
  {
    title: "AI Fitness Planner",
    desc: "An AI-powered fitness planner using CrewAI and Streamlit that generates personalized workout routines based on user input with multiple AI agents to create, review, and refine plans.",
    tags: ["Python", "CrewAI", "Streamlit", "AI Agents"],
    github: "https://github.com/ibrahimabid276/AI-Powered-Daily-Fitness-Planner-CrewAI-Streamlit-",
  },
  {
    title: "Smart Book Q&A (RAG)",
    desc: "A RAG-based Q&A system that allows users to ask questions about books and get intelligent answers using retrieval-augmented generation with CrewAI.",
    tags: ["Python", "CrewAI", "RAG", "NLP"],
    github: "https://github.com/ibrahimabid276/Smart-Book-Q-A-Crew-CrewAI-RAG-Project-",
  },
  {
    title: "Wolf Hunt Treasure Chase",
    desc: "Step into the paws of a clever wolf on a fast-paced treasure hunt! Collect coins and apples scattered across the forest while racing against time.",
    tags: ["Python", "Pygame", "Game Dev"],
    github: "https://github.com/ibrahimabid276/-Wolf-Hunt-Treasure-Chase",
  },
  {
    title: "CrewAI Fitness Planner",
    desc: "A CrewAI-based fitness planner that generates daily workout plans with warm-up, recovery, and safety review using multi-agent collaboration.",
    tags: ["Python", "CrewAI", "AI Agents"],
    github: "https://github.com/ibrahimabid276/CrewAI-Fitness-Planner",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding gradient-bg" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm font-medium mb-2">My work</p>
          <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass rounded-xl p-6 group hover:neon-border transition-all duration-500 hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-2 group-hover:neon-text transition-all duration-300">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github size={18} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
