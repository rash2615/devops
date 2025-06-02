# Projet DevOps - React + Express

Ce projet est une application web simple utilisant React pour le frontend et Express pour le backend, avec une configuration CI/CD via GitLab.

## Prérequis

- Node.js 18+
- Docker et Docker Compose
- GitLab CI/CD

## Installation

1. Cloner le repository :
```bash
git clone <votre-repo>
cd devops
```

2. Installer les dépendances :
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

3. Lancer l'application avec Docker Compose :
```bash
docker-compose up
```

## Accès à l'application

- Frontend : http://localhost:3000
- Backend : http://localhost:5000

## Tests

- Tests unitaires backend : `npm test` dans le dossier backend
- Tests E2E Cypress : `npm run cypress:run` dans le dossier frontend

## Structure du projet 