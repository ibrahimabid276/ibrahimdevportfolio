import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useMemo } from "react";
import { Github, ArrowRight, Star, GitFork, Loader2 } from "lucide-react";
import ProjectModal from "./ProjectModal";

const GITHUB_USERNAME = "ibrahimabid276";
const CACHE_KEY = "gh_starred_cache_v1";
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

type Repo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prettify(name: string) {
  return name.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim();
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        // Try cache first for instant render
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (parsed.t && Date.now() - parsed.t < CACHE_TTL_MS && Array.isArray(parsed.d)) {
              if (!cancelled) {
                setRepos(shuffle(parsed.d));
                setLoading(false);
              }
            }
          } catch {}
        }

        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100&sort=updated`,
          { headers: { Accept: "application/vnd.github+json" } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data: Repo[] = await res.json();
        const clean = data.map((r) => ({
          id: r.id,
          name: r.name,
          full_name: r.full_name,
          description: r.description,
          html_url: r.html_url,
          homepage: r.homepage,
          language: r.language,
          topics: r.topics || [],
          stargazers_count: r.stargazers_count,
          forks_count: r.forks_count,
          updated_at: r.updated_at,
        }));
        localStorage.setItem(CACHE_KEY, JSON.stringify({ t: Date.now(), d: clean }));
        if (!cancelled) {
          setRepos(shuffle(clean));
          setError(null);
        }
      } catch (e: any) {
        if (!cancelled && repos.length === 0) setError(e?.message || "Failed to load repos");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayed = useMemo(() => repos, [repos]);

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
            <p className="text-xs text-muted-foreground font-mono mt-3">
              Live from GitHub · shuffled on each visit
            </p>
          </motion.div>

          {loading && displayed.length === 0 && (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={28} />
            </div>
          )}

          {error && displayed.length === 0 && (
            <div className="text-center py-12">
              <p className="text-sm text-muted-foreground mb-3">Couldn't load repos right now.</p>
              <a
                href={`https://github.com/${GITHUB_USERNAME}?tab=stars`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary text-sm font-mono hover:underline"
              >
                View on GitHub →
              </a>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
            {displayed.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, rotateY: -45, y: 40 }}
                animate={isInView ? { opacity: 1, rotateY: 0, y: 0 } : {}}
                transition={{ delay: Math.min(i * 0.06, 0.5), duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="glass rounded-2xl p-6 group hover:shadow-[0_0_40px_hsl(142_71%_45%/0.15)] hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                <h3 className="text-lg font-semibold mb-2 group-hover:neon-text transition-all duration-300">
                  {prettify(p.name)}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">
                  {p.description || "No description provided."}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {[p.language, ...p.topics].filter(Boolean).slice(0, 4).map((tag) => (
                    <span
                      key={tag as string}
                      className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <a
                      href={p.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                      aria-label="View on GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <span className="flex items-center gap-1 text-xs font-mono">
                      <Star size={12} /> {p.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-mono">
                      <GitFork size={12} /> {p.forks_count}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedRepo(p)}
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
        project={selectedRepo ? {
          title: prettify(selectedRepo.name),
          problem: selectedRepo.description || "No description provided on GitHub.",
          solution: `Open-source project hosted at ${selectedRepo.full_name}. Visit the repo for full source, README, and usage instructions.`,
          metrics: [
            `${selectedRepo.stargazers_count} stars · ${selectedRepo.forks_count} forks`,
            selectedRepo.language ? `Primary language: ${selectedRepo.language}` : "Multi-language project",
            `Last updated: ${new Date(selectedRepo.updated_at).toLocaleDateString()}`,
          ],
          tags: [selectedRepo.language, ...selectedRepo.topics].filter(Boolean) as string[],
        } : null}
        onClose={() => setSelectedRepo(null)}
      />
    </>
  );
};

export default Projects;
