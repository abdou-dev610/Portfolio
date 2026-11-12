import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, CheckCircle2 } from "lucide-react";

const contactInfo = [
  { icon: Mail, label: "Email", value: "ndiayeabdoumamesaye1234@gmail.com", href: "mailto:ndiayeabdoumamesaye1234@gmail.com" },
  { icon: Phone, label: "Téléphone", value: "221 76 204 81 19", href: "tel:221 76 204 81 19" },
  { icon: MapPin, label: "Localisation", value: "Dakar, Sénégal", href: null },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/abdou-dev610" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/abdoundiaye/" },
  { icon: Twitter, label: "Twitter", href: "https://x.com/AbdouNdiay95016" },
];

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [formState, setFormState] = useState({ name: "", email: "", subject: "", message: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formState.name.trim()) newErrors.name = "Le nom est requis";
    if (!formState.email.trim()) newErrors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Email invalide";
    if (!formState.message.trim()) newErrors.message = "Le message est requis";
    else if (formState.message.length < 10) newErrors.message = "Message trop court (min 10 caractères)";
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Format message for WhatsApp
      const message = `
*📝 Nouveau Message de Contact*

*Nom:* ${formState.name}
*Email:* ${formState.email}
*Téléphone:* ${formState.phone || "Non fourni"}
*Sujet:* ${formState.subject || "Non spécifié"}

*Message:*
${formState.message}
      `.trim();

      // Send via WhatsApp
      const whatsappUrl = `https://wa.me/221762048119?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, "_blank");

      setLoading(false);
      setSubmitted(true);
      setFormState({ name: "", email: "", subject: "", message: "", phone: "" });
    } catch (error) {
      console.error("Erreur:", error);
      setErrors({ submit: "Erreur lors de l'envoi. Veuillez réessayer." });
      setLoading(false);
    }
  };

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
            Parlons-nous
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contact
          </h1>
          <p className="text-muted-foreground text-lg">
            Une idée de projet ? Une opportunité ? N'hésitez pas à me contacter, je réponds rapidement.
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 max-w-5xl mx-auto">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Contact Info */}
            <div className="card-surface rounded-xl p-6 space-y-5">
              <h2 className="font-display font-bold text-xl text-foreground">Informations de contact</h2>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">{label}</p>
                    {href ? (
                      <a href={href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="card-surface rounded-xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-4">Réseaux sociaux</h3>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="card-surface rounded-xl p-6 border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="font-semibold text-foreground text-sm">Disponible actuellement</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Ouvert aux missions freelance et opportunités CDI pour des projets ambitieux.
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="card-surface rounded-xl p-6 sm:p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <CheckCircle2 size={56} className="text-primary mx-auto mb-4" />
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    Message envoyé !
                  </h3>
                  <p className="text-muted-foreground">
                    Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "", phone: "" });
                    }}
                    className="mt-6 px-5 py-2.5 rounded-lg border border-border text-sm text-foreground hover:border-primary/50 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form ref={form} onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="name">
                        Nom <span className="text-primary">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Abdoul Khadre"
                        maxLength={100}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                          errors.name ? "border-destructive" : "border-border focus:border-primary/50"
                        }`}
                      />
                      {errors.name && <p className="text-destructive text-xs mt-1">{errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">
                        Email <span className="text-primary">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder=""
                        maxLength={255}
                        className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${
                          errors.email ? "border-destructive" : "border-border focus:border-primary/50"
                        }`}
                      />
                      {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="subject">
                      Sujet
                    </label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formState.subject}
                      onChange={handleChange}
                      placeholder="Projet web, collaboration..."
                      maxLength={200}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Phone (optional) */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="phone">
                      Téléphone <span className="text-muted-foreground text-xs">(optionnel)</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formState.phone}
                      onChange={handleChange}
                      placeholder="+221 76 204 81 19"
                      maxLength={20}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="message">
                      Message <span className="text-primary">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre projet, vos besoins..."
                      maxLength={2000}
                      className={`w-full px-4 py-3 rounded-lg bg-secondary border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${
                        errors.message ? "border-destructive" : "border-border focus:border-primary/50"
                      }`}
                    />
                    <div className="flex justify-between mt-1">
                      {errors.message ? (
                        <p className="text-destructive text-xs">{errors.message}</p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted-foreground">{formState.message.length}/2000</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-all teal-glow hover:scale-[1.01]"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Envoyer le message
                      </>
                    )}
                  </button>

                  {errors.submit && (
                    <p className="text-destructive text-sm text-center">{errors.submit}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
