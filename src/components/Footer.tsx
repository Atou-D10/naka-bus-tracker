import { Link } from "@tanstack/react-router";
import { Bus, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Link to="/" className="flex items-center gap-2 text-primary">
              <Bus className="h-6 w-6" />
              <span className="text-lg font-bold">NakaBus</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Horaires et temps d'attente en temps réel pour les bus de la banlieue dakaroise.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/lignes" className="hover:text-foreground transition-colors">Lignes</Link>
              </li>
              <li>
                <Link to="/terrain" className="hover:text-foreground transition-colors">Terrain</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>Km 5, Boulevard du Centenaire, Dakar, Sénégal</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+221 33 123 45 67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <span>contact@nakabus.sn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} NakaBus. Tous droits réservés.</p>
          <p>Mentions légales · Politique de confidentialité</p>
        </div>
      </div>
    </footer>
  );
}
