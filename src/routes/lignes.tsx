import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Route as RouteIcon, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/lignes")({
  head: () => ({
    meta: [
      { title: "Lignes — NakaBus" },
      { name: "description", content: "Horaires et temps d'attente en temps réel des bus Dakar Dem Dikk, cars rapides et Ndiaga Ndiaye." },
      { property: "og:title", content: "Lignes — NakaBus" },
      { property: "og:description", content: "Horaires et temps d'attente en temps réel des bus Dakar Dem Dikk, cars rapides et Ndiaga Ndiaye." },
    ],
  }),
  component: LignesPage,
});

const filters = [
  "Tous",
  "Dakar Dem Dikk",
  "Cars Rapides",
  "Ndiaga Ndiaye",
] as const;

type FilterType = (typeof filters)[number];

const busLines = [
  {
    id: 1,
    nom: "DDD Ligne 26",
    type: "Dakar Dem Dikk" as const,
    trajet: "Pikine Est → Plateau",
    attente: "12 min",
    statut: "Disponible" as const,
  },
  {
    id: 2,
    nom: "Car Rapide 76",
    type: "Cars Rapides" as const,
    trajet: "Thiaroye → Sandaga",
    attente: "8 min",
    statut: "Disponible" as const,
  },
  {
    id: 3,
    nom: "DDD Ligne 15",
    type: "Dakar Dem Dikk" as const,
    trajet: "Guédiawaye → Plateau",
    attente: null,
    statut: "Indisponible" as const,
  },
  {
    id: 4,
    nom: "Ndiaga Ndiaye 101",
    type: "Ndiaga Ndiaye" as const,
    trajet: "Keur Massar → Colobane",
    attente: "5 min",
    statut: "Disponible" as const,
  },
  {
    id: 5,
    nom: "DDD Ligne 8",
    type: "Dakar Dem Dikk" as const,
    trajet: "Parcelles Assainies → Plateau",
    attente: "18 min",
    statut: "Disponible" as const,
  },
  {
    id: 6,
    nom: "Car Rapide 54",
    type: "Cars Rapides" as const,
    trajet: "Rufisque → Liberté 6",
    attente: "22 min",
    statut: "Disponible" as const,
  },
];

function LignesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Tous");

  const filtered =
    activeFilter === "Tous"
      ? busLines
      : busLines.filter((l) => l.type === activeFilter);

  return (
    <div className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Lignes de bus</h1>
          <p className="mt-2 text-muted-foreground">
            Temps d'attente estimés en temps réel pour la banlieue dakaroise
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeFilter === f
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-4">
          {filtered.map((line) => (
            <div
              key={line.id}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`mt-0.5 h-3 w-3 shrink-0 rounded-full ${
                    line.statut === "Disponible" ? "bg-chart-3" : "bg-destructive"
                  }`}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-foreground">{line.nom}</span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        line.statut === "Disponible"
                          ? "bg-chart-3/15 text-chart-3"
                          : "bg-destructive/15 text-destructive"
                      }`}
                    >
                      {line.statut}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                    <RouteIcon className="h-3.5 w-3.5" />
                    {line.trajet}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pl-7 sm:pl-0">
                {line.statut === "Disponible" && line.attente ? (
                  <>
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold text-primary">
                      {line.attente} d'attente
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-sm font-medium text-destructive">
                      Service interrompu
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
