import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Route as RouteIcon, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { callDifyAPI } from "../lib/dify-config";

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
  const [query, setQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const askNakaBus = async () => {
    if (!query.trim() || aiLoading) return;
    setAiLoading(true);
    setAiError(null);
    setAiResult(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort("timeout"), 10000);

    try {
      const text = await callDifyAPI(query, { query }, {
        signal: controller.signal,
        userId: "user-nakabus-" + Date.now(),
      });
      setAiResult(text ?? "Aucune réponse reçue.");
    } catch (err: unknown) {
      const isAbort =
        (err instanceof DOMException && err.name === "AbortError") ||
        (err as { name?: string })?.name === "AbortError";
      setAiError(
        isAbort
          ? "La réponse prend trop de temps — réessayez"
          : "Service temporairement indisponible",
      );
    } finally {
      clearTimeout(timeout);
      setAiLoading(false);
    }
  };

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

        {/* AI assistant */}
        <div className="mb-8 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="text-sm font-semibold text-foreground">Assistant NakaBus</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") askNakaBus();
              }}
              placeholder="Posez votre question sur votre trajet (ex: bus Pikine vers Plateau 7h30)..."
              className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={aiLoading}
            />
            <button
              onClick={askNakaBus}
              disabled={aiLoading || !query.trim()}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {aiLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Recherche...
                </>
              ) : (
                <>Demander à NakaBus 🚌</>
              )}
            </button>
          </div>

          {(aiLoading || aiResult || aiError) && (
            <div className="mt-4">
              {aiLoading && (
                <div className="flex items-center gap-2 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  Consultation de l'assistant en cours...
                </div>
              )}
              {!aiLoading && aiError && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>{aiError}</span>
                </div>
              )}
              {!aiLoading && aiResult && (
                <div className="whitespace-pre-wrap rounded-md bg-muted px-4 py-3 text-sm text-foreground">
                  {aiResult}
                </div>
              )}
            </div>
          )}
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
