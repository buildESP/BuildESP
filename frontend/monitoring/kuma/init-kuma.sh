#!/bin/sh

echo "[init] Attente que l'API de Kuma soit disponible..."

# On attend une vraie réponse JSON
until curl -s http://127.0.0.1:3001/api/status | grep -q '"ok":true'; do
  echo "[init] ... attente de l'API ..."
  sleep 2
done

echo "[init] API prête. Connexion à Kuma..."

LOGIN_JSON=$(curl -s -X POST http://127.0.0.1:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "BuildinguerieCestMieux"}')

TOKEN=$(echo "$LOGIN_JSON" | grep -o '"token":"[^"]*' | cut -d':' -f2 | tr -d '"')

if [ -z "$TOKEN" ]; then
  echo "[init] ❌ Échec de connexion à Kuma. Vérifie le mot de passe."
  echo "[DEBUG] Réponse brute : $LOGIN_JSON"
  exit 1
fi

echo "[init] ✅ Connecté à Kuma."

BACKEND_IP=$(getent hosts backend | awk '{ print $1 }')

echo "[init] IP du backend : $BACKEND_IP"

curl -s -X POST http://127.0.0.1:3001/api/monitor \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{
    \"name\": \"API Backend\",
    \"type\": \"http\",
    \"url\": \"http://$BACKEND_IP:3000\",
    \"interval\": 60,
    \"retryInterval\": 30,
    \"maxretries\": 3
  }"

echo "[init] ✅ Sondes ajoutées avec succès."
