import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, MapPin, Shield, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NakaBus — Horaires bus Dakar en temps réel" },
      { name: "description", content: "Consultez les horaires et temps d'attente des bus Dakar Dem Dikk, cars rapides et Ndiaga Ndiaye pour la banlieue dakaroise." },
      { property: "og:title", content: "NakaBus — Horaires bus Dakar en temps réel" },
      { property: "og:description", content: "Consultez les horaires et temps d'attente des bus Dakar Dem Dikk, cars rapides et Ndiaga Ndiaye." },
    ],
  }),
  component: Index,
});

const stats = [
  { value: "15 000+", label: "Navetteurs aidés chaque jour" },
  { value: "42", label: "Lignes couvertes sur Dakar" },
  { value: "98%", label: "Précision des temps d'attente" },
];

function Index() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur mb-6">
            <MapPin className="h-3.5 w-3.5" />
            <span>Pikine · Guédiawaye · Thiaroye</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Ne ratez plus jamais
            <br />
            <span className="text-accent">votre bus</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            Horaires et temps d'attente en temps réel pour les bus de la banlieue dakaroise.
            Partez à la bonne heure, arrivez à l'heure au travail.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/lignes"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg transition-transform hover:scale-105"
            >
              <Clock className="h-4 w-4" />
              Trouver mon bus
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="https://wa.me/221701234567?text=Bonjour%20NakaBus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground shadow-lg transition-transform hover:scale-105"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Essayer sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {stat.label.includes("Navetteurs") ? (
                    <Users className="h-5 w-5 text-primary" />
                  ) : stat.label.includes("Lignes") ? (
                    <MapPin className="h-5 w-5 text-primary" />
                  ) : (
                    <Shield className="h-5 w-5 text-primary" />
                  )}
                </div>
                <span className="text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Aperçu lignes */}
      <section className="border-t border-border bg-muted/20 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">Lignes populaires</h2>
              <p className="mt-1 text-sm text-muted-foreground">Les trajets les plus consultés ce matin</p>
            </div>
            <Link
              to="/lignes"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
            >
              Voir toutes les lignes
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { nom: "DDD Ligne 26", trajet: "Pikine Est → Plateau", attente: "12 min", statut: "Disponible" },
              { nom: "Car Rapide 76", trajet: "Thiaroye → Sandaga", attente: "8 min", statut: "Disponible" },
              { nom: "Ndiaga Ndiaye 101", trajet: "Keur Massar → Colobane", attente: "5 min", statut: "Disponible" },
            ].map((l) => (
              <div
                key={l.nom}
                className="rounded-xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">{l.nom}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      l.statut === "Disponible"
                        ? "bg-chart-3/15 text-chart-3"
                        : "bg-destructive/15 text-destructive"
                    }`}
                  >
                    {l.statut}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{l.trajet}</p>
                <p className="mt-2 text-sm font-medium text-primary">{l.attente} d'attente</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
