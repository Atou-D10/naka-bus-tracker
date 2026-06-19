import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, AlertCircle, ClipboardList } from "lucide-react";
import { callDifyAPI } from "../lib/dify-config";
import {
  type Signalement,
  clearSignalements,
  formatRelativeTime,
  loadSignalements,
  createTerrainSignalement,
  saveSignalement,
} from "../lib/signalements";

export const Route = createFileRoute("/terrain")({
  head: () => ({
    meta: [
      { title: "Saisie Trafic Terrain — NakaBus" },
      { name: "description", content: "Saisie de données terrain pour chauffeurs et contrôleurs NakaBus." },
      { property: "og:title", content: "Saisie Trafic Terrain — NakaBus" },
      { property: "og:description", content: "Saisie de données terrain pour chauffeurs et contrôleurs NakaBus." },
    ],
  }),
  component: TerrainPage,
});

function TerrainPage() {
  const [conditions, setConditions] = useState("");
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [signalements, setSignalements] = useState<Signalement[]>([]);

  useEffect(() => {
    setSignalements(loadSignalements().slice(0, 5));
  }, []);

  const handleClearSignalements = () => {
    clearSignalements();
    setSignalements([]);
  };

  const genererFiche = async () => {
    if (!question.trim() || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort("timeout"), 10000);

    try {
      const answer = await callDifyAPI(
        question.trim(),
        {
          query: question.trim(),
          donnees_terrain: conditions.trim(),
        },
        {
          signal: controller.signal,
          userId: "agent-terrain-nakabus",
        }
      );
      const returnedAnswer = answer ?? "Aucune réponse reçue.";
      setResult(returnedAnswer);
      const signalement = createTerrainSignalement(conditions.trim(), returnedAnswer);
      saveSignalement(signalement);
    } catch (err: unknown) {
      const isAbort =
        (err instanceof DOMException && err.name === "AbortError") ||
        (err as { name?: string })?.name === "AbortError";
      setError(
        isAbort
          ? "La réponse prend trop de temps — réessayez"
          : err instanceof Error
            ? err.message
            : String(err)
      );
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: "#0B5E2F" }}>
            🚌 Saisie Trafic Terrain
          </h1>
          <p className="mt-2 text-muted-foreground">
            Chauffeur / Contrôleur — Données en temps réel
          </p>
        </div>

        <div className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Conditions observées */}
          <div>
            <label htmlFor="conditions" className="mb-2 block text-sm font-medium text-foreground">
              Conditions observées
            </label>
            <textarea
              id="conditions"
              rows={6}
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              placeholder="Ex: Arrêt Pikine Est 17/06 07h15 — DDD Ligne 26 : 35 min de retard, embouteillage Liberté 6"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Question */}
          <div>
            <label htmlFor="question" className="mb-2 block text-sm font-medium text-foreground">
              Votre question
            </label>
            <input
              id="question"
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") genererFiche();
              }}
              placeholder="Ex: Quel bus prendre à Pikine Est ?"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              disabled={loading}
            />
          </div>

          {/* Bouton */}
          <button
            onClick={genererFiche}
            disabled={loading || !question.trim()}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: "#0B5E2F" }}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                ⏳ Génération en cours...
              </>
            ) : (
              <>
                <ClipboardList className="h-4 w-4" />
                🚌 Générer la fiche trajet
              </>
            )}
          </button>

          {/* Loading */}
          {loading && (
            <div className="flex items-center gap-2 rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              ⏳ Génération en cours...
            </div>
          )}

          {/* Erreur */}
          {!loading && error && (
            <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Résultat */}
          {!loading && result && (
            <div
              className="rounded-md bg-muted px-4 py-3 text-sm text-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              {result}
            </div>
          )}
        </div>

        <div className="mt-6 rounded-xl border border-border bg-[#F9FAFB] p-5 shadow-sm">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">📡 Derniers signalements terrain</h2>
              <p className="text-sm text-muted-foreground">
                Les cinq derniers signalements enregistrés depuis la saisie terrain.
              </p>
            </div>
          </div>

          {signalements.length === 0 ? (
            <div className="rounded-2xl border border-border bg-white p-4 text-sm text-muted-foreground">
              Aucun signalement récent — soyez le premier à signaler.
            </div>
          ) : (
            <div className="space-y-3">
              {signalements.map((signalement) => {
                const isAlert = /perturbé|indisponible/i.test(signalement.statut);
                return (
                  <div
                    key={signalement.id}
                    className="rounded-2xl border border-border bg-white p-4 shadow-sm sm:p-5"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-3">
                        <span
                          className={`mt-1 h-3.5 w-3.5 shrink-0 rounded-full ${
                            isAlert ? "bg-destructive" : "bg-emerald-500"
                          }`}
                        />
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {signalement.heure} · {signalement.ligne} · {signalement.arret} · {signalement.retard}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Source : {signalement.source}
                          </p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatRelativeTime(signalement.id)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {signalements.length > 0 && (
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleClearSignalements}
                className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                🗑 Effacer les signalements
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
