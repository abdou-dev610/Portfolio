import { useState } from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import project1Img from "@/assets/project6.jpg";
import project2Img from "@/assets/project5.jpg";
import project3Img from "@/assets/project7.jpg";

const allProjects = [
  {
    title: "Dashboard Analytics",
    description: "Tableau de bord analytique en temps réel avec visualisations interactives, gestion des KPIs et rapports exportables.",
    image: project1Img,
    tags: ["React", "TypeScript", "Recharts", "Node.js", "PostgreSQL"],
    githubUrl: "https://github.com/abdou-2000",
    liveUrl: "https://poetic-crumble-b5a5cd.netlify.app/profile",
    category: "Web App",
  },
  {
    title: "E-Commerce Platform",
    description: "Plateforme e-commerce complète avec gestion de produits, panier, paiement Stripe et espace administrateur.",
    image: project2Img,
    tags: ["Next.js", "Stripe", "Prisma", "TailwindCSS"],
    githubUrl: "https://github.com/abdou-2000",
    liveUrl: "https://poetic-crumble-b5a5cd.netlify.app/",
    category: "E-Commerce",
  },
  {
    title: "Task Manager Mobile",
    description: "Application mobile de gestion de tâches avec synchronisation cloud, notifications push et collaboration en équipe.",
    image: project3Img,
    tags: ["React Native", "Firebase", "Redux", "Expo"],
    githubUrl: "https://github.com/abdou-2000",
    liveUrl: "https://lucent-hummingbird-028f4f.netlify.app/",
    category: "Mobile",
  },
];

const categories = ["Tous", "Web App", "E-Commerce", "Mobile", "Backend"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filtered = activeCategory === "Tous"
    ? allProjects
    : allProjects.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Mon travail
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Mes projets
            </h1>
            <p className="text-muted-foreground text-lg">
              Une sélection de projets réalisés — chacun une solution concrète à un vrai problème.
            </p>
          </motion.div>
        </section>

        {/* Filter Tabs */}
        <section className="container mx-auto px-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground teal-glow-sm"
                    : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Projects Grid */}
        <section className="container mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <ProjectCard key={project.title} {...project} index={i} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-surface rounded-2xl p-10 max-w-xl mx-auto"
          >
            <Github size={40} className="text-primary mx-auto mb-4" />
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Voir plus sur GitHub
            </h3>
            <p className="text-muted-foreground mb-6">
              Retrouvez tous mes projets open source, contributions et expérimentations sur GitHub.
            </p>
            <a
              href="https://github.com/abdou-2000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all teal-glow"
            >
              <Github size={18} />
              Mon GitHub
              <ExternalLink size={14} />
            </a>
          </motion.div>
        </section>
      </main>
  );
};

export default Projects;
