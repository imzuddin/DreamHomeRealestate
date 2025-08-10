#!/usr/bin/env bash
set -euo pipefail

apt-get update -qq
apt-get install -y -qq netcat-traditional 

HOST="localhost"
PORT="1521"

pip install -r "requirements.txt"

echo "⏳ Waiting for Oracle listener on ${HOST}:${PORT}…"
sleep 20

until nc -zv "$HOST" "$PORT" >/dev/null 2>&1; do
  echo "⏳ ${HOST}:${PORT} not reachable—sleeping 10s…"
  sleep 20
done

echo "✅ Oracle listener is up on ${HOST}:${PORT}"


echo "Starting Uvicorn"
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
