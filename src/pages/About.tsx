import { motion } from "framer-motion";
import { Code2, Palette, Server, Smartphone, Database, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import profileImg from "@/assets/profile.jpg";

const skills = [
  { name: "React / Next.js", level: 92, category: "Frontend" },
  { name: "TypeScript", level: 88, category: "Frontend" },
  { name: "CSS / Tailwind", level: 90, category: "Frontend" },
  { name: "Node.js / Express", level: 82, category: "Backend" },
  { name: "Python / Django", level: 75, category: "Backend" },
  { name: "PostgreSQL / MongoDB", level: 80, category: "Database" },
  { name: "Docker / CI-CD", level: 70, category: "DevOps" },
  { name: "Figma / UI Design", level: 78, category: "Design" },
];

const services = [
  { icon: Code2, title: "Développement Frontend", desc: "React, TypeScript, animations fluides, interfaces modernes." },
  { icon: Server, title: "Développement Backend", desc: "APIs RESTful, Node.js, Python, architecture scalable." },
  { icon: Database, title: "Bases de données", desc: "PostgreSQL, MongoDB, optimisation des requêtes." },
  { icon: Smartphone, title: "Design Responsive", desc: "Sites parfaitement adaptés mobile, tablette, desktop." },
  { icon: Globe, title: "Déploiement Cloud", desc: "Vercel, AWS, Docker, configurations CI/CD." },
  { icon: Palette, title: "UI/UX Design", desc: "Maquettes Figma, design system, expérience utilisateur." },
];

const SkillBar = ({ name, level, index }: { name: string; level: number; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.06 }}
    className="space-y-2"
  >
    <div className="flex justify-between text-sm">
      <span className="font-medium text-foreground">{name}</span>
      <span className="text-primary font-semibold">{level}%</span>
    </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        className="h-full rounded-full skill-bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: index * 0.06 + 0.2, ease: "easeOut" }}
      />
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        {/* Header */}
        <section className="container mx-auto px-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Qui suis-je ?
            </p>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              À propos de moi
            </h1>
            <p className="text-muted-foreground text-lg">
              Un développeur passionné, curieux et toujours en quête de perfection.
            </p>
          </motion.div>
        </section>

        {/* Bio Section */}
        <section className="container mx-auto px-6 mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="relative max-w-sm mx-auto lg:mx-0">
                <div className="absolute -inset-4 rounded-2xl border border-primary/20 rotate-3" />
                <div className="absolute -inset-2 rounded-2xl border border-primary/10 -rotate-1" />
                <img
                  src={profileImg}
                  alt="Alexandre"
                  className="relative rounded-2xl w-full object-cover aspect-square teal-glow"
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
                Bonjour ! Je suis Alexandre Martin
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Développeur Full Stack avec plus de 5 ans d'expérience, je me spécialise dans la création d'applications web robustes et performantes. Mon expertise couvre aussi bien le développement frontend avec React que le backend avec Node.js et Python.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Basé à Paris, je travaille avec des startups et des entreprises pour transformer leurs idées en produits numériques innovants. J'accorde une grande importance à la qualité du code, aux bonnes pratiques et à l'expérience utilisateur.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En dehors du code, je m'intéresse à l'open source, à l'IA et au design. Toujours avide d'apprendre, je contribue régulièrement à des projets communautaires.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Localisation", value: "Paris, France" },
                  { label: "Disponibilité", value: "Freelance / CDI" },
                  { label: "Email", value: "alex@example.com" },
                  { label: "Langues", value: "FR, EN, ES" },
                ].map((item) => (
                  <div key={item.label}>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider">{item.label}</span>
                    <p className="text-sm font-medium text-foreground mt-0.5">{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills */}
        <section className="bg-card border-y border-border py-20 mb-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Expertise</p>
              <h2 className="font-display text-3xl font-bold text-foreground">Mes compétences</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {skills.map((skill, i) => (
                <SkillBar key={skill.name} {...skill} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Services</p>
            <h2 className="font-display text-3xl font-bold text-foreground">Ce que je propose</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-surface rounded-xl p-6 hover:border-primary/40 hover:teal-glow-sm transition-all duration-300 group"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <service.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default About;
