import { motion } from "framer-motion";
import { Code2, Palette, Server, Smartphone, Database, Globe, Check } from "lucide-react";
import { useState } from "react";
import profileImg from "@/assets/profile1.jpeg";

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

const quoteData = {
  siteTypes: [
    {
      id: "vitrine",
      icon: "🌐",
      title: "Site Vitrine/Portfolio",
      options: [
        { id: "vitrine-simple", label: "Simple", description: "3-4 pages basiques" },
        { id: "vitrine-standard", label: "Standard", description: "5-7 pages + animations" },
        { id: "vitrine-pro", label: "Professionnel", description: "8-10 pages + galerie" },
      ],
    },
    {
      id: "ecommerce",
      icon: "🛒",
      title: "Site E-commerce",
      options: [
        { id: "eco-simple", label: "Simple", description: "Jusqu'à 50 produits" },
        { id: "eco-standard", label: "Standard", description: "Jusqu'à 200 produits" },
        { id: "eco-pro", label: "Professionnel", description: "Produits illimités" },
      ],
    },
    {
      id: "blog",
      icon: "📰",
      title: "Blog/Site Éditorial",
      options: [
        { id: "blog-simple", label: "Simple", description: "Blog basique" },
        { id: "blog-standard", label: "Standard", description: "Multi-auteurs" },
        { id: "blog-pro", label: "Professionnel", description: "Magazine complet" },
      ],
    },
  ],
  hostingOptions: [
    { id: "hosting-1", label: "1 an - 50 000 CFA" },
    { id: "hosting-2", label: "2 ans - 90 000 CFA" },
    { id: "hosting-3", label: "3 ans - 125 000 CFA" },
  ],
  defaultPages: [
    "Accueil",
    "À propos",
    "Services",
    "Contact",
  ],
};

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
  const [selectedSiteType, setSelectedSiteType] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedHosting, setSelectedHosting] = useState<string | null>(null);
  const [extraPages, setExtraPages] = useState(0);

  const handleWhatsAppClick = () => {
    const selectedSite = quoteData.siteTypes.find(site => site.id === selectedSiteType);
    const selectedOpt = selectedSite?.options.find(opt => opt.id === selectedOption);
    const selectedHost = quoteData.hostingOptions.find(host => host.id === selectedHosting);
    
    const message = `🌐 *DEMANDE DE DEVIS WEB*

📋 *TYPE DE SITE:* ${selectedOpt?.label || "Non sélectionné"}
🏷️ *CATÉGORIE:* ${selectedSite?.title || "Non sélectionné"}
📝 *DESCRIPTION:* ${selectedOpt?.description || ""}

⚙️ *CONFIGURATION:*
${selectedHost?.label || "Non sélectionné"}

📄 *PAGES SUPPLÉMENTAIRES:* ${extraPages}

💳 *PAIEMENT FLEXIBLE:* 30% / 40% / 30%`;
    
    const whatsappUrl = `https://wa.me/221762048119?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };
  return (
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
                Bonjour ! Je suis Abdoul Khadre Ndiaye
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Développeur Full Stack avec plus d'un an d'expérience, je me spécialise dans la création d'applications web robustes et performantes. Mon expertise couvre aussi bien le développement frontend avec React que le backend avec Node.js et Python.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Basé à Dakar, je travaille avec des startups et des entreprises pour transformer leurs idées en produits numériques innovants. J'accorde une grande importance à la qualité du code, aux bonnes pratiques et à l'expérience utilisateur.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                En dehors du code, je m'intéresse à l'open source, à l'IA et au design. Toujours avide d'apprendre, je contribue régulièrement à des projets communautaires.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { label: "Localisation", value: "Dakar, Sénégal" },
                  { label: "Disponibilité", value: "Freelance / CDI" },
                  { label: "Email", value: "ndiayeabdoumamesaye1234@gmail.com" },
                  { label: "Langues", value: "FR, EN" },
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

        {/* Quote Calculator */}
        <section className="container mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">
              Estimez votre projet
            </p>
            <h2 className="font-display text-3xl font-bold text-foreground">Créer mon Devis</h2>
            <p className="text-muted-foreground mt-2">Estimez le coût de votre projet en quelques clics</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Left Side - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Site Type */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-surface rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    1
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">Type de site</h3>
                </div>

                {quoteData.siteTypes.map((siteType) => (
                  <div key={siteType.id} className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{siteType.icon}</span>
                      <h4 className="font-semibold text-foreground">{siteType.title}</h4>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-3">
                      {siteType.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            setSelectedSiteType(siteType.id);
                            setSelectedOption(option.id);
                          }}
                          className={`p-4 rounded-lg border-2 text-left transition-all ${
                            selectedOption === option.id
                              ? "border-primary bg-primary/10"
                              : "border-border hover:border-primary/50"
                          }`}
                        >
                          <p className="font-semibold text-foreground text-sm">{option.label}</p>
                          <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Step 2: Hosting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-surface rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    2
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">Configuration de base</h3>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Domaine + Hébergement</label>
                  <select
                    value={selectedHosting || ""}
                    onChange={(e) => setSelectedHosting(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
                  >
                    <option value="">Sélectionner une option</option>
                    {quoteData.hostingOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-muted-foreground mt-2">
                    Inclut: Nom de domaine + Hébergement partagé (coûts supplémentaires selon disponibilité du domaine)
                  </p>
                </div>
              </motion.div>

              {/* Step 3: Pages & Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card-surface rounded-xl p-6 space-y-4"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary">
                    3
                  </div>
                  <h3 className="font-display font-bold text-lg text-foreground">Pages et contenu</h3>
                </div>

                <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-foreground mb-3">Pages incluses par défaut :</p>
                  {quoteData.defaultPages.map((page) => (
                    <div key={page} className="flex items-center gap-2">
                      <Check size={16} className="text-primary" />
                      <span className="text-sm text-foreground">{page}</span>
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pages supplémentaires</label>
                  <div className="flex gap-3">
                    <input
                      type="number"
                      min="0"
                      value={extraPages}
                      onChange={(e) => setExtraPages(Math.max(0, parseInt(e.target.value) || 0))}
                      className="flex-1 px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      disabled
                      className="px-6 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm font-medium cursor-default"
                    >
                      +10 000 CFA/page
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Side - Summary */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="card-surface rounded-xl p-6 sticky top-32 space-y-6">
                <h3 className="font-display font-bold text-xl text-foreground">Résumé du devis</h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type de site</span>
                    <span className="font-medium text-foreground">
                      {quoteData.siteTypes
                        .find(s => s.id === selectedSiteType)
                        ?.options.find(o => o.id === selectedOption)?.label || "Non sélectionné"}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Domaine + Hébergement</span>
                      <span className="font-medium text-foreground">
                        {quoteData.hostingOptions.find(h => h.id === selectedHosting)?.label.split(' - ')[0] || "Non sélectionné"}
                      </span>
                    </div>
                  </div>
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Pages supplémentaires</span>
                      <span className="font-medium text-foreground">{extraPages}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg p-6 border border-primary/20">
                  <p className="text-xs text-muted-foreground mb-2">Devis estimé</p>
                  <p className="text-3xl font-bold text-primary mb-1">À discuter</p>
                  <p className="text-xs text-muted-foreground">Paiement flexible : 30% / 40% / 30%</p>
                </div>

                <button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-gradient-to-r from-primary to-cyan-400 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 font-display"
                >
                  Commander ce devis
                </button>
                <p className="text-center text-xs text-muted-foreground">Devis gratuit • Réponse sous 24h</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
  );
};

export default About;
