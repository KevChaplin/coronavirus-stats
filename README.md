# Coronavirus Stats

## Purpose

Proof of concept application for monitoring global statistics regarding COVID-19.

## App Struture

SPA  
Front-end: Vue.js  
Back-end: FastAPI  
"Database": External API call

## Instructions

run the script `start.sh` to run locally
use argument 'docker' to start in docker

```sh
./start.sh docker
```

### Alternatively

Start backend

```sh
cd services/backend
pip install -r requirements.txt
uvicorn src.main:app --reload
```

Start frontend

```sh
cd services/frontend
npm install
npm run dev
```

## visit http://localhost:5173/

<!-- docker-compose up -d --build -->
