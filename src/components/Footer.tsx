import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter, Mail, Code2, ArrowUpRight } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/abdou-dev610" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/abdoundiaye/" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Mail, label: "Email", href: "mailto:ndiayeabdoumamesaye1234@gmail.com" },
];

const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "À propos", href: "/about" },
  { label: "Projets", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Code2 size={18} className="text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-lg">
                Abdou<span className="text-primary">Dev</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Développeur Full Stack passionné, créant des expériences web modernes et performantes.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ndiayeabdoumamesaye1234@gmail.com</li>
              <li>Dakar, sénégal</li>
              <li className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-primary hover:underline font-medium text-sm"
                >
                  Envoyer un message <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AbdouDev. Tous droits réservés.</p>
        
        </div>
      </div>
    </footer>
  );
};

export default Footer;
