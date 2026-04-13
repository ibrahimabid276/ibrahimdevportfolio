import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Neural Style Transfer Engine",
    desc: "Real-time artistic style transfer using deep CNNs with custom loss functions and GPU optimization.",
    tags: ["PyTorch", "CUDA", "FastAPI", "Docker"],
  },
  {
    title: "LLM-Powered Code Assistant",
    desc: "Fine-tuned large language model for code generation and debugging with RAG-based context retrieval.",
    tags: ["Transformers", "LangChain", "React", "Python"],
  },
  {
    title: "Predictive Analytics Dashboard",
    desc: "End-to-end ML pipeline for time-series forecasting with interactive visualizations and automated retraining.",
    tags: ["Scikit-learn", "Airflow", "D3.js", "AWS"],
  },
  {
    title: "Computer Vision Quality Inspector",
    desc: "Automated defect detection system for manufacturing using YOLOv8 and edge deployment on Jetson.",
    tags: ["YOLO", "TensorRT", "OpenCV", "IoT"],
  },
  {
    title: "NLP Sentiment Analyzer",
    desc: "Multi-language sentiment analysis API processing 10K+ requests/min with transformer models.",
    tags: ["BERT", "FastAPI", "Redis", "K8s"],
  },
  {
    title: "Recommendation Engine",
    desc: "Collaborative filtering system serving personalized recommendations to 1M+ users in real-time.",
    tags: ["TensorFlow", "Spark", "Neo4j", "GCP"],
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
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github size={18} />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <ExternalLink size={18} />
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
