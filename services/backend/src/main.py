from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from typing import List
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class CountryStats(BaseModel):
    Active_Cases_text: str = ''
    Country_text: str = ''
    Last_Update: str = ''
    New_Cases_text: str = ''
    New_Deaths_text: str = ''
    Total_Cases_text: str = ''
    Total_Deaths_text: str = ''
    Total_Recovered_text: str = ''

# get individual country statistics
@app.get("/api/v1/{country}")
def get_stats(country: str):
    url = f"https://covid-19.dataflowkit.com/v1/{country}"
    response: CountryStats = requests.get(url)
    return response.json()

# get list of countries
@app.get("/api/v1")
def get_stats():
    url = f"https://covid-19.dataflowkit.com/v1"
    response: List[CountryStats] = requests.get(url).json()
    all_countries = []
    for country in response:
        country_stats = CountryStats(**country)
        all_countries.append(country_stats.Country_text)
    return all_countries