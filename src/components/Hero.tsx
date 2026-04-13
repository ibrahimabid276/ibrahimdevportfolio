import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const floatingElements = [
  { text: "{ }", delay: 0, x: "85%", y: "15%" },
  { text: "< />", delay: 1, x: "90%", y: "55%" },
  { text: "=>", delay: 2, x: "75%", y: "80%" },
  { text: "[ ]", delay: 0.5, x: "95%", y: "35%" },
  { text: "//", delay: 1.5, x: "80%", y: "70%" },
];

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center gradient-bg overflow-hidden">
      <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center pt-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm"
          >
            Welcome to my portfolio
          </motion.div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            Hi, I'm{" "}
            <span className="neon-text">Alex Chen</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            AI/ML Engineer | Data Scientist | Developer
          </p>

          <p className="text-muted-foreground max-w-lg leading-relaxed">
            Passionate about building intelligent systems and crafting elegant solutions.
            Specializing in deep learning, NLP, and scalable ML pipelines that transform
            data into actionable insights.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#projects"
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-[0_0_30px_hsl(142_71%_45%/0.3)] transition-all duration-300"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
            >
              Contact Me
            </a>
          </div>

          <div className="flex items-center gap-4 pt-4">
            {[
              { icon: Github, href: "#", label: "GitHub" },
              { icon: Linkedin, href: "#", label: "LinkedIn" },
              { icon: Mail, href: "#", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="p-2.5 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/30 hover:neon-glow transition-all duration-300"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right Content - Profile */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center items-center"
        >
          {/* Glowing ring */}
          <div className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full border-2 border-primary/30 animate-spin-slow" />
          <div className="absolute w-80 h-80 md:w-[22rem] md:h-[22rem] rounded-full border border-primary/10 animate-[spin-slow_12s_linear_infinite_reverse]" />

          {/* Profile image */}
          <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden glow-ring">
            <img
              src={profileImg}
              alt="Alex Chen - AI/ML Engineer"
              width={512}
              height={512}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Available badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-2 right-1/4 px-3 py-1.5 rounded-full glass neon-border flex items-center gap-2 text-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-medium">Available</span>
          </motion.div>

          {/* Floating tech elements */}
          {floatingElements.map((el, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: el.delay + 0.5 }}
              className="absolute text-primary/40 font-mono text-sm animate-float hidden lg:block"
              style={{
                left: el.x,
                top: el.y,
                animationDelay: `${el.delay}s`,
              }}
            >
              {el.text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
      >
        <ArrowDown size={20} />
      </motion.a>
    </section>
  );
};

export default Hero;
