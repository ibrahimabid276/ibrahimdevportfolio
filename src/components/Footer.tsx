import { Github, Mail } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/30 py-8">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-muted-foreground">
        © 2026 Syed Ibrahim. Built with passion & code.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/ibrahimabid276"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Github size={18} />
        </a>
        <a
          href="mailto:ibrahimabid276@gmail.com"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Mail size={18} />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
