#!/bin/bash

# Attend que Kuma soit dispo
until curl -s http://localhost:3001 > /dev/null; do
  echo "En attente de Kuma..."
  sleep 2
done

# Login admin (remplace les credentials si besoin)
TOKEN=$(curl -s -X POST http://localhost:3001/api/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "BuildinguerieCestMieux"}' \
  | jq -r .token)

# IP dynamique du backend (ex: via dig, route, etc.)
BACKEND_IP=$(getent hosts backend | awk '{ print $1 }')

# Ajoute une sonde HTTP vers le backend
curl -s -X POST http://localhost:3001/api/monitor \
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
