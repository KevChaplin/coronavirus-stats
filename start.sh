#!/bin/bash

if [ "$1" = "docker" ]; then

# Front-end
    # Build the Docker image
    docker build -t corona-stats-api-image ./services/backend

    # Run a container from the built image
    docker run -d --name corona-stats-api-container -p 8080:8080 corona-stats-api-image

# Back-end
    # Build the Docker image
    docker build -t corona-stats-client-image ./services/frontend

    # Run a container from the built image
    docker run -d --name corona-stats-client-container -p 5173:5173 corona-stats-client-image

else
    # Start backend
    cd services/backend
    pip install -r requirements.txt
    uvicorn src.main:app --reload &

    # Start frontend
    cd ../frontend
    npm install
    npm run dev
fi