#!/bin/bash

if [ "$1" = "docker" ]; then
    # Build the Docker image
    docker build -t corona-stats-api-image ./services/backend

    # Run a container from the built image
    docker run -d --name corona-stats-api-container -p 8080:8080 corona-stats-api-image
else
    # Start backend in the background
    cd services/backend
    pip install -r requirements.txt
    uvicorn src.main:app --reload &

    # Start frontend in the foreground
    cd ../frontend
    npm install
    npm run dev
fi