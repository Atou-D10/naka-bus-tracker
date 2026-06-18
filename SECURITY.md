# 🔐 Configuration Sécurité — Dify API

## Configuration des Variables d'Environnement

Le token Dify est **sécurisé** et stocké dans des variables d'environnement au lieu d'être en dur dans le code.

### ✅ Setup local

1. **Copier le fichier d'exemple** :
   ```bash
   cp .env.example .env.local
   ```

2. **Ajouter votre token Dify** dans `.env.local` :
   ```
   VITE_DIFY_TOKEN=app-YOUR_ACTUAL_TOKEN_HERE
   VITE_DIFY_API_URL=https://api.dify.ai/v1
   ```

3. **Le fichier `.env.local` est ignoré** par Git (cf. `.gitignore` contient `*.local`)

### 📝 Fichiers concernés

- **`.env.example`** — Modèle à partager avec l'équipe
- **`.env.local`** — Token réel (❌ NE PAS commiter)
- **`src/lib/dify-config.ts`** — Centralize config + API wrapper

### 🔌 Utilisation dans le code

Avant :
```tsx
// ❌ Token exposé en dur
const res = await fetch("https://api.dify.ai/v1/chat-messages", {
  headers: {
    Authorization: "Bearer app-lEi9PPhkxgt3CEfIcYDywcD0",
  },
})
```

Après :
```tsx
// ✅ Sécurisé via import.meta.env
import { callDifyAPI } from "../lib/dify-config";

const text = await callDifyAPI(query, inputs, { signal, userId });
```

### 🚀 Déploiement

Pour **production** (ex: Vercel, Netlify) :
- Ajouter les secrets dans le dashboard du provider
- Variables : `VITE_DIFY_TOKEN` et `VITE_DIFY_API_URL`

### ⚠️ Checklist sécurité

- [x] Token **pas en dur** dans les fichiers sources
- [x] Variables d'env supportées par Vite (`VITE_*`)
- [x] `.env.local` ignoré par Git
- [x] Fonction wrapper `callDifyAPI` centralisée
- [x] Gestion d'erreurs améliorée (timeout, validation)

### 📌 Fichiers modifiés

- `src/routes/lignes.tsx` — Utilise `callDifyAPI`
- `src/routes/terrain.tsx` — Utilise `callDifyAPI`
- `src/lib/dify-config.ts` — Config centralisée (**nouveau**)
- `.env.example` — Modèle (**nouveau**)
- `.env.local` — Local (**nouveau**, ignoré par Git)
