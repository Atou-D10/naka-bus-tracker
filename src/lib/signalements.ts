export type Signalement = {
  id: number;
  ligne: string;
  arret: string;
  statut: string;
  retard: string;
  heure: string;
  date: string;
  source: string;
};

const STORAGE_KEY = "nakabus_signalements";

const knownStops = [
  "Pikine Est",
  "Plateau",
  "Thiaroye",
  "Sandaga",
  "Keur Massar",
  "Colobane",
  "Guédiawaye",
  "Parcelles Assainies",
  "Rufisque",
  "Liberté 6",
];

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatHeure = (date: Date) => {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${hours}h${minutes}`;
};

const getKnownStop = (text: string) => {
  const normalized = text.toLowerCase();
  return knownStops.find((stop) => normalized.includes(stop.toLowerCase()));
};

const normalizeLine = (text: string) => {
  const patterns = [
    /([A-Z0-9 ]*Ligne\s*\d+)/i,
    /(DDD\s*Ligne\s*\d+)/i,
    /(Car Rapide\s*\d+)/i,
    /(Ndiaga Ndiaye\s*\d+)/i,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match?.[1]) {
      return match[1].trim();
    }
  }

  const genericMatch = text.match(/Ligne\s*(\d+)/i);
  if (genericMatch?.[0]) {
    return genericMatch[0].trim();
  }

  return null;
};

const parseArret = (text: string) => {
  const explicitMatch = text.match(/Arr[eé]t\s*[:\-]?\s*([A-Za-zÀ-ÿ0-9' ]+?)(?=\s*(?:—|–|,|:|$))/i);
  if (explicitMatch?.[1]) {
    return explicitMatch[1].trim();
  }

  const known = getKnownStop(text);
  if (known) {
    return known;
  }

  return "Arrêt inconnu";
};

const parseDate = (text: string) => {
  const match = text.match(/(\d{1,2}\/\d{1,2}(?:\/\d{2,4})?)/);
  if (!match?.[1]) {
    return formatDate(new Date());
  }

  const candidate = match[1];
  if (/\d{1,2}\/\d{1,2}\/\d{2,4}/.test(candidate)) {
    const parts = candidate.split("/");
    const day = String(Number(parts[0])).padStart(2, "0");
    const month = String(Number(parts[1])).padStart(2, "0");
    const year = parts[2].length === 2 ? `20${parts[2]}` : parts[2];
    return `${day}/${month}/${year}`;
  }

  const year = new Date().getFullYear();
  const parts = candidate.split("/");
  const day = String(Number(parts[0])).padStart(2, "0");
  const month = String(Number(parts[1])).padStart(2, "0");
  return `${day}/${month}/${year}`;
};

const parseHeure = (text: string) => {
  const match = text.match(/(\d{1,2}h\d{2})/i) ?? text.match(/(\d{1,2}[:\.]\d{2})/i);
  if (!match?.[1]) {
    return formatHeure(new Date());
  }

  const heure = match[1].replace(/[:\.]/g, "h");
  return heure;
};

const parseRetard = (text: string) => {
  const match = text.match(/(\d+\s*(?:min|minutes))/i);
  if (match?.[1]) {
    return match[1].trim();
  }

  const genericMatch = text.match(/retard\s*(?:de)?\s*(\d+)/i);
  if (genericMatch?.[1]) {
    return `${genericMatch[1].trim()} minutes`;
  }

  return "N/A";
};

const parseSource = (text: string) => {
  const match = text.match(/(chauffeur\s+[A-Za-zÀ-ÿ]+)/i) ?? text.match(/(contr[oô]leur\s+[A-Za-zÀ-ÿ]+)/i);
  return match?.[1] ?? "chauffeur terrain";
};

const parseStatut = (text: string) => {
  const lowerText = text.toLowerCase();
  if (/indispon|indispo|perturb|retard|embouteil/i.test(lowerText)) {
    return "perturbé";
  }
  if (/disponible/i.test(lowerText)) {
    return "Disponible";
  }
  return "Disponible";
};

const isSignalement = (value: any): value is Signalement => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.id === "number" &&
    typeof value.ligne === "string" &&
    typeof value.arret === "string" &&
    typeof value.statut === "string" &&
    typeof value.retard === "string" &&
    typeof value.heure === "string" &&
    typeof value.date === "string" &&
    typeof value.source === "string"
  );
};

export const loadSignalements = (): Signalement[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSignalement).sort((a, b) => b.id - a.id);
  } catch {
    return [];
  }
};

export const saveSignalement = (signalement: Signalement) => {
  if (typeof window === "undefined") {
    return;
  }

  const current = loadSignalements();
  const updated = [signalement, ...current].slice(0, 50);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearSignalements = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
};

export const formatRelativeTime = (timestamp: number) => {
  const diff = Date.now() - timestamp;
  if (diff < 60_000) {
    return "à l'instant";
  }
  if (diff < 3_600_000) {
    const minutes = Math.max(1, Math.round(diff / 60_000));
    return `il y a ${minutes} minutes`;
  }
  if (diff < 86_400_000) {
    const hours = Math.round(diff / 3_600_000);
    return `il y a ${hours} ${hours === 1 ? "heure" : "heures"}`;
  }
  const days = Math.round(diff / 86_400_000);
  return `il y a ${days} ${days === 1 ? "jour" : "jours"}`;
};

export const createTerrainSignalement = (conditions: string, answer: string): Signalement => {
  const text = `${conditions} ${answer}`.trim();

  return {
    id: Date.now(),
    ligne: normalizeLine(text) ?? "Ligne inconnue",
    arret: parseArret(text),
    statut: parseStatut(text),
    retard: parseRetard(text),
    heure: parseHeure(text),
    date: parseDate(text),
    source: parseSource(text),
  };
};
