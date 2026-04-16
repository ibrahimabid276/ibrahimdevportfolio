import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import ProjectModal from "./ProjectModal";

const projects = [
  {
    title: "ColdMailAI",
    desc: "An AI-powered tool that analyzes a target company's website, identifies key areas for improvement, and automatically drafts personalized, professional cold emails that get results.",
    tags: ["Python", "CrewAI", "LLM", "Web Scraping"],
    github: "https://github.com/ibrahimabid276/ColdMailAI",
    problem: "Cold outreach emails are often generic and fail to connect with prospects. Writing personalized emails at scale requires deep research that's time-consuming.",
    solution: "Built a multi-agent AI system using CrewAI that scrapes a company's website, analyzes their pain points, and generates highly personalized cold emails with specific value propositions.",
    metrics: ["90% reduction in email drafting time", "Multi-agent pipeline with 3 specialized AI agents", "Web scraping + LLM analysis integration"],
  },
  {
    title: "AI Story Book Creator",
    desc: "An AI-powered web app that generates personalized kids' stories based on user input like hero name, story type, power, and location. Built with Streamlit and CrewAI.",
    tags: ["Python", "Streamlit", "CrewAI", "AI"],
    github: "https://github.com/ibrahimabid276/My-Story-Book-Creator-Streamlit-",
    problem: "Parents and educators want unique, personalized stories for children but lack time or creative writing skills to produce them consistently.",
    solution: "Created an interactive Streamlit app with CrewAI agents that take user preferences (hero name, story type, powers) and generate complete illustrated children's stories.",
    metrics: ["Dynamic story generation in under 30 seconds", "5+ customizable story parameters", "Built with Streamlit for instant web deployment"],
  },
  {
    title: "AI Fitness Planner",
    desc: "An AI-powered fitness planner using CrewAI and Streamlit that generates personalized workout routines based on user input with multiple AI agents.",
    tags: ["Python", "CrewAI", "Streamlit", "AI Agents"],
    github: "https://github.com/ibrahimabid276/AI-Powered-Daily-Fitness-Planner-CrewAI-Streamlit-",
    problem: "Generic workout plans don't account for individual fitness levels, goals, and constraints. Personal trainers are expensive.",
    solution: "Developed a multi-agent system where one agent creates the plan, another reviews safety, and a third refines the routine — all collaborating through CrewAI.",
    metrics: ["3 specialized AI agents collaborating", "Personalized warm-up, workout, and recovery plans", "Safety review agent for injury prevention"],
  },
  {
    title: "Smart Book Q&A (RAG)",
    desc: "A RAG-based Q&A system that allows users to ask questions about books and get intelligent answers using retrieval-augmented generation with CrewAI.",
    tags: ["Python", "CrewAI", "RAG", "NLP"],
    github: "https://github.com/ibrahimabid276/Smart-Book-Q-A-Crew-CrewAI-RAG-Project-",
    problem: "Reading entire books to find specific information is inefficient. Traditional search can't understand context or provide synthesized answers.",
    solution: "Built a RAG system that chunks, embeds, and indexes book content, then uses CrewAI agents to retrieve relevant passages and generate accurate answers.",
    metrics: ["Retrieval-augmented generation pipeline", "ChromaDB for vector storage", "Context-aware answer synthesis"],
  },
  {
    title: "Wolf Hunt Treasure Chase",
    desc: "Step into the paws of a clever wolf on a fast-paced treasure hunt! Collect coins and apples scattered across the forest while racing against time.",
    tags: ["Python", "Pygame", "Game Dev"],
    github: "https://github.com/ibrahimabid276/-Wolf-Hunt-Treasure-Chase",
    problem: "Wanted to explore game development fundamentals and create an engaging, simple game to sharpen Python programming skills.",
    solution: "Developed a Pygame-based treasure chase game with collision detection, scoring system, and time-based challenges.",
    metrics: ["Built entirely in Python with Pygame", "Real-time collision detection system", "Score tracking and time-based difficulty"],
  },
  {
    title: "CrewAI Fitness Planner",
    desc: "A CrewAI-based fitness planner that generates daily workout plans with warm-up, recovery, and safety review using multi-agent collaboration.",
    tags: ["Python", "CrewAI", "AI Agents"],
    github: "https://github.com/ibrahimabid276/CrewAI-Fitness-Planner",
    problem: "Needed an automated, intelligent system to plan balanced daily workouts that include proper warm-up and recovery phases.",
    solution: "Leveraged CrewAI's multi-agent framework to create specialized agents for workout planning, safety validation, and recovery optimization.",
    metrics: ["End-to-end automated fitness pipeline", "Multi-agent collaboration for balanced plans", "Includes warm-up and recovery phases"],
  },
];

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="projects" className="section-padding relative" ref={ref}>
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-primary text-sm font-medium font-mono mb-2">{"// projects"}</p>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Projects</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-6 group hover:shadow-[0_0_40px_hsl(142_71%_45%/0.15)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:neon-text transition-all duration-300">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github size={18} />
                  </a>
                  <button
                    onClick={() => setSelectedProject(p)}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium hover:gap-3 transition-all duration-300 group/btn"
                  >
                    View Details
                    <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject ? {
          title: selectedProject.title,
          problem: selectedProject.problem,
          solution: selectedProject.solution,
          metrics: selectedProject.metrics,
          tags: selectedProject.tags,
        } : null}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};

export default Projects;
