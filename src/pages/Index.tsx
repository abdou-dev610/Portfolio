import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Download, Sparkles } from "lucide-react";
import profileImg from "@/assets/profile.jpg";

const Home = () => {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />

        <div className="container mx-auto px-6 pt-20 pb-10">
          <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
            {/* Text */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6"
              >
                <Sparkles size={14} />
                Disponible pour de nouveaux projets
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground mb-4"
              >
                Bonjour, je suis{" "}
                <span className="text-gradient">Alexandre</span>
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground mb-6"
              >
                Développeur Full Stack
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-muted-foreground text-lg leading-relaxed max-w-xl mb-8 mx-auto lg:mx-0"
              >
                Je crée des expériences web modernes, performantes et accessibles. Passionné par le code propre, le design soigné et les solutions innovantes.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all duration-200 teal-glow hover:scale-105"
                >
                  Voir mes projets
                  <ArrowDown size={16} />
                </Link>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-200"
                >
                  <Download size={16} />
                  Télécharger CV
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="flex gap-4 justify-center lg:justify-start mt-8"
              >
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative flex-shrink-0"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                {/* Decorative ring */}
                <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-pulse-glow" />
                <div className="absolute inset-3 rounded-full border border-primary/10" />
                {/* Image */}
                <div className="absolute inset-6 rounded-full overflow-hidden teal-glow">
                  <img
                    src={profileImg}
                    alt="Alexandre - Développeur Full Stack"
                    className="w-full h-full object-cover animate-float"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-2 -right-2 bg-card border border-border rounded-xl px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs font-medium text-foreground">Disponible</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground">Défiler</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} className="text-primary" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats / Quick Info */}
      <section className="py-16 border-y border-border bg-card">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { number: "5+", label: "Ans d'expérience" },
              { number: "30+", label: "Projets réalisés" },
              { number: "20+", label: "Clients satisfaits" },
              { number: "10+", label: "Technologies maîtrisées" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Récemment
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Quelques projets phares
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Un aperçu de mes créations récentes — des applications web complètes, performantes et bien designées.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-all teal-glow"
            >
              Voir tous les projets →
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Home;
