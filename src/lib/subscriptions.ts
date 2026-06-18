export type Subscription = {
  ligne: string;
  whatsapp: string;
};

const STORAGE_KEY = "nakabus_subscriptions";
const SESSION_NOTIFIED_KEY = "nakabus_notified_lines";

const isSubscription = (value: any): value is Subscription => {
  return (
    typeof value === "object" &&
    value !== null &&
    typeof value.ligne === "string" &&
    typeof value.whatsapp === "string"
  );
};

export const loadSubscriptions = (): Subscription[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSubscription);
  } catch {
    return [];
  }
};

export const saveSubscription = (subscription: Subscription) => {
  if (typeof window === "undefined") {
    return;
  }

  const current = loadSubscriptions();
  const updated = current.filter((item) => item.ligne !== subscription.ligne);
  updated.unshift(subscription);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const isLineSubscribed = (ligne: string) => {
  const subscriptions = loadSubscriptions();
  return subscriptions.some((item) => item.ligne === ligne);
};

export const getSubscriptionForLine = (ligne: string) => {
  const subscriptions = loadSubscriptions();
  return subscriptions.find((item) => item.ligne === ligne);
};

export const markLineAsNotified = (ligne: string) => {
  if (typeof window === "undefined") {
    return;
  }

  const raw = window.sessionStorage.getItem(SESSION_NOTIFIED_KEY);
  const notified = raw ? JSON.parse(raw) : [];
  if (!Array.isArray(notified)) {
    window.sessionStorage.setItem(SESSION_NOTIFIED_KEY, JSON.stringify([ligne]));
    return;
  }

  if (!notified.includes(ligne)) {
    window.sessionStorage.setItem(SESSION_NOTIFIED_KEY, JSON.stringify([...notified, ligne]));
  }
};

export const isLineAlreadyNotified = (ligne: string) => {
  if (typeof window === "undefined") {
    return false;
  }

  const raw = window.sessionStorage.getItem(SESSION_NOTIFIED_KEY);
  const notified = raw ? JSON.parse(raw) : [];
  return Array.isArray(notified) && notified.includes(ligne);
};

export const buildWhatsAppUrl = (whatsapp: string, ligne: string, statut: string, arret: string) => {
  const phone = whatsapp.replace(/\s+/g, "");
  const text = `🚌 NakaBus ALERTE :\nLa ${ligne} est actuellement ${statut}.\nArrêt ${arret}. Heure : ${new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}.`;
  return `https://wa.me/${encodeURIComponent(phone)}?text=${encodeURIComponent(text)}`;
};

export const normalizeWhatsAppNumber = (value: string) => {
  const digits = value.replace(/[^0-9+]/g, "");
  if (!digits.startsWith("+221")) {
    return "";
  }
  const rest = digits.slice(4);
  if (rest.length !== 9) {
    return "";
  }
  return `+221 ${rest.slice(0, 2)} ${rest.slice(2, 5)} ${rest.slice(5, 7)} ${rest.slice(7, 9)}`;
};

export const isValidWhatsAppNumber = (value: string) => {
  return /^\+221\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/.test(value.trim());
};
