#!/bin/sh
# synchronise le repo local avec la branche main sur origin(github)
git fetch origin && git reset --hard origin/main && git clean -f -d && \
# on stop tout les containers dans le compose de prod
docker compose -f docker-compose.prod.yml down && \
# on pull la der niere version des images dans le compose de prod
docker compose -f docker-compose.prod.yml pull && \
# on relance le compose en précisant un fichier env qui contient toutes les variables nécessaires pour l'ensemble des services
docker compose -f docker-compose.prod.yml --env-file .env.production up -d;