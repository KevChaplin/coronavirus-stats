#!/bin/bash

# Start backend in the background
cd services/backend
pip install -r requirements.txt
uvicorn src.main:app --reload &

# Start frontend in the foreground
cd services/frontend
npm install
npm run dev