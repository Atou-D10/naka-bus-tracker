import { Fragment, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Route as RouteIcon, AlertCircle, Loader2, Sparkles } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
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

type StopCoordinates = {
  lat: number;
  lng: number;
};

type BusLine = {
  id: number;
  nom: string;
  type: (typeof filters)[number];
  trajet: string;
  attente: string | null;
  statut: string;
  departCoord: StopCoordinates;
  arriveeCoord: StopCoordinates;
};

const stopCoordinates: Record<string, StopCoordinates> = {
  "Pikine Est": { lat: 14.7549, lng: -17.3902 },
  Plateau: { lat: 14.6708, lng: -17.4348 },
  Thiaroye: { lat: 14.7644, lng: -17.3756 },
  Sandaga: { lat: 14.6726, lng: -17.438 },
  "Keur Massar": { lat: 14.7833, lng: -17.3167 },
  Colobane: { lat: 14.6892, lng: -17.4467 },
  "Guédiawaye": { lat: 14.7833, lng: -17.4 },
  "Parcelles Assainies": { lat: 14.7531, lng: -17.4256 },
  Rufisque: { lat: 14.7167, lng: -17.2667 },
  "Liberté 6": { lat: 14.7167, lng: -17.45 },
};

const busLines: BusLine[] = [
  {
    id: 1,
    nom: "DDD Ligne 26",
    type: "Dakar Dem Dikk",
    trajet: "Pikine Est → Plateau",
    attente: "12 min",
    statut: "Disponible",
    departCoord: stopCoordinates["Pikine Est"],
    arriveeCoord: stopCoordinates["Plateau"],
  },
  {
    id: 2,
    nom: "Car Rapide 76",
    type: "Cars Rapides",
    trajet: "Thiaroye → Sandaga",
    attente: "8 min",
    statut: "Disponible",
    departCoord: stopCoordinates.Thiaroye,
    arriveeCoord: stopCoordinates.Sandaga,
  },
  {
    id: 3,
    nom: "DDD Ligne 15",
    type: "Dakar Dem Dikk",
    trajet: "Guédiawaye → Plateau",
    attente: null,
    statut: "Indisponible",
    departCoord: stopCoordinates["Guédiawaye"],
    arriveeCoord: stopCoordinates.Plateau,
  },
  {
    id: 4,
    nom: "Ndiaga Ndiaye 101",
    type: "Ndiaga Ndiaye",
    trajet: "Keur Massar → Colobane",
    attente: "5 min",
    statut: "Disponible",
    departCoord: stopCoordinates["Keur Massar"],
    arriveeCoord: stopCoordinates.Colobane,
  },
  {
    id: 5,
    nom: "DDD Ligne 8",
    type: "Dakar Dem Dikk",
    trajet: "Parcelles Assainies → Plateau",
    attente: "18 min",
    statut: "Disponible",
    departCoord: stopCoordinates["Parcelles Assainies"],
    arriveeCoord: stopCoordinates.Plateau,
  },
  {
    id: 6,
    nom: "Car Rapide 54",
    type: "Cars Rapides",
    trajet: "Rufisque → Liberté 6",
    attente: "22 min",
    statut: "Disponible",
    departCoord: stopCoordinates.Rufisque,
    arriveeCoord: stopCoordinates["Liberté 6"],
  },
];

function LignesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("Tous");
  const [departQuery, setDepartQuery] = useState("");
  const [arriveeQuery, setArriveeQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [query, setQuery] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<string | null>(null);

  const linesWithStops = busLines.map((line) => {
    const [depart, arrivee] = line.trajet.split("→").map((value) => value.trim());
    return { ...line, depart, arrivee };
  });

  const departSuggestions = Array.from(new Set(linesWithStops.map((line) => line.depart))).sort();
  const arriveeSuggestions = Array.from(new Set(linesWithStops.map((line) => line.arrivee))).sort();

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

  const filteredByType =
    activeFilter === "Tous"
      ? linesWithStops
      : linesWithStops.filter((l) => l.type === activeFilter);

  const filteredByRoute = filteredByType.filter((line) => {
    const departMatches = line.depart
      .toLowerCase()
      .includes(departQuery.trim().toLowerCase());
    const arriveeMatches = line.arrivee
      .toLowerCase()
      .includes(arriveeQuery.trim().toLowerCase());
    return departMatches && arriveeMatches;
  });

  const hasSearch = departQuery.trim() || arriveeQuery.trim();

  const displayedLines = hasSearch ? filteredByRoute : filteredByType;

  const mapLines = displayedLines.filter((line) => line.departCoord && line.arriveeCoord);
  const dakarsCenter = { lat: 14.6937, lng: -17.4441 };

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

        {/* Search trajet */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-4 space-y-2 text-sm text-foreground sm:flex sm:items-center sm:justify-between sm:space-y-0">
            <div>
              <p className="font-semibold text-foreground">Recherche de trajet</p>
              <p className="text-muted-foreground">Filtrez par départ et arrivée sans appel réseau.</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setDepartQuery("");
                setArriveeQuery("");
              }}
              className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Réinitialiser
            </button>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80">
                Départ
              </span>
              <input
                list="depart-suggestions"
                value={departQuery}
                onChange={(e) => setDepartQuery(e.target.value)}
                placeholder="Ex: Pikine Est"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#0B5E2F] focus:outline-none focus:ring-1 focus:ring-[#0B5E2F]"
              />
              <datalist id="depart-suggestions">
                {departSuggestions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80">
                Arrivée
              </span>
              <input
                list="arrivee-suggestions"
                value={arriveeQuery}
                onChange={(e) => setArriveeQuery(e.target.value)}
                placeholder="Ex: Plateau"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#0B5E2F] focus:outline-none focus:ring-1 focus:ring-[#0B5E2F]"
              />
              <datalist id="arrivee-suggestions">
                {arriveeSuggestions.map((item) => (
                  <option key={item} value={item} />
                ))}
              </datalist>
            </label>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
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
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              Vue liste
            </button>
            <button
              type="button"
              onClick={() => setViewMode("map")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                viewMode === "map"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "border border-border bg-card text-foreground hover:bg-muted"
              }`}
            >
              Vue carte
            </button>
          </div>
        </div>

        {viewMode === "map" ? (
          <div className="mb-8 rounded-xl border border-border bg-card p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">Carte des arrêts</h2>
                <p className="text-sm text-muted-foreground">
                  Les marqueurs reflètent le filtre sélectionné et la recherche actuelle.
                </p>
              </div>
            </div>
            <div className="min-h-[60vh] overflow-hidden rounded-xl border border-border">
              <MapContainer
                center={[dakarsCenter.lat, dakarsCenter.lng]}
                zoom={12}
                scrollWheelZoom={false}
                className="h-[60vh] w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {mapLines.map((line) => {
                  const isAvailable = line.statut === "Disponible";
                  const color = isAvailable ? "#0B5E2F" : "#dc2626";

                  return (
                    <Fragment key={line.id}>
                      <CircleMarker
                        center={[line.departCoord.lat, line.departCoord.lng]}
                        pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
                        radius={10}
                      >
                        <Popup>
                          <div className="space-y-1 text-sm">
                            <p className="font-semibold">{line.nom}</p>
                            <p>{line.trajet}</p>
                            <p>
                              <span className="font-semibold">Statut :</span> {line.statut}
                            </p>
                            <p>
                              <span className="font-semibold">Attente :</span>{" "}
                              {line.attente ?? "N/A"}
                            </p>
                          </div>
                        </Popup>
                      </CircleMarker>
                      <CircleMarker
                        center={[line.arriveeCoord.lat, line.arriveeCoord.lng]}
                        pathOptions={{ color, fillColor: color, fillOpacity: 0.8 }}
                        radius={10}
                      >
                        <Popup>
                          <div className="space-y-1 text-sm">
                            <p className="font-semibold">{line.nom}</p>
                            <p>{line.trajet}</p>
                            <p>
                              <span className="font-semibold">Statut :</span> {line.statut}
                            </p>
                            <p>
                              <span className="font-semibold">Attente :</span>{" "}
                              {line.attente ?? "N/A"}
                            </p>
                          </div>
                        </Popup>
                      </CircleMarker>
                    </Fragment>
                  );
                })}
              </MapContainer>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedLines.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-6 text-center text-sm text-foreground shadow-sm">
                Aucune ligne trouvée pour ce trajet.
              </div>
            ) : (
              displayedLines.map((line) => (
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
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
