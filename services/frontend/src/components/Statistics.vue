<script>
import MapChart from './WorldMap.vue'
import { useCountryStore } from '../stores/countryStore.js'

export default {
    name: 'Statistics',
    components: {
        MapChart
    },
    data() {
        return {
            stats: {
                allCountries: [],
                allCountriesSorted: [],
                selectedCountry: '',
                isCountryData: false,
                countryStats: {
                    activeCases: '0',
                    country: '',
                    lastUpdated: '',
                    newCases: '0',
                    newDeaths: '0',
                    totalCases: '0',
                    totalDeaths: '0',
                    TotalRecoverd: '0'
                }
            }
        }
    },
    // get all countries for use in select box, sorted with 'World' at top
    async mounted() {
        const response = await fetch('http://localhost:5000/api/v1')
        this.stats.allCountries = await response.json()
        const regex = /^world$/i
        this.stats.allCountriesSorted = [
            this.stats.allCountries.find((item) => regex.test(item))
        ].concat(
            this.stats.allCountries
                .filter((item) => !regex.test(item) && item != '')
                .sort()
        )
        // TO DO: keep in store
    },
    methods: {
        // on select country, get that countries data
        async handleChange() {
            if (this.stats.selectedCountry) {
                const response = await fetch(
                    `http://localhost:5000/api/v1/${this.stats.selectedCountry}`
                )
                const data = await response.json()
                // TO DO: store data
                if (data) {
                    this.stats.isCountryData = true
                }
                this.stats.countryStats = {
                    activeCases: data['Active Cases_text'] || '0',
                    country: data['Country_text'] || '',
                    lastUpdated: data['Last Update'] || '',
                    newCases: data['New Cases_text'] || '0',
                    newDeaths: data['New Deaths_text'] || '0',
                    totalCases: data['Total Cases_text'] || '',
                    totalDeaths: data['Total Deaths_text'] || '',
                    totalRecovered: data['Total Recovered_text'] || ''
                }
                // update the store value
                const countryStore = useCountryStore()
                countryStore.set(this.stats.selectedCountry)
            }
        }
    }
}
</script>

<template>
    <div class="stats-page">
        <h1 class="green">Statistics Page</h1>
        <h3>
            Coronavirus statistics by individual country, or the whole world
        </h3>

        <div class="container">
            <select
                class="green"
                @change="handleChange"
                v-model="stats.selectedCountry"
            >
                <option disabled value="">Select country</option>
                <option
                    v-for="country in stats.allCountriesSorted"
                    :value="country"
                >
                    {{ country }}
                </option>
            </select>
            <div class="map-stats">
                <div class="svg">
                    <MapChart />
                </div>
                <table class="data-table green" v-if="this.stats.isCountryData">
                    <tbody>
                        <tr>
                            <td>Active Cases</td>
                            <td>{{ stats.countryStats.activeCases }}</td>
                        </tr>
                        <tr>
                            <td>Last Update</td>
                            <td>{{ stats.countryStats.lastUpdated }}</td>
                        </tr>
                        <tr>
                            <td>New Cases</td>
                            <td>{{ stats.countryStats.newCases }}</td>
                        </tr>
                        <tr>
                            <td>New Deaths</td>
                            <td>{{ stats.countryStats.newDeaths }}</td>
                        </tr>
                        <tr>
                            <td>Total Cases</td>
                            <td>{{ stats.countryStats.totalCases }}</td>
                        </tr>
                        <tr>
                            <td>Total Deaths</td>
                            <td>{{ stats.countryStats.totalDeaths }}</td>
                        </tr>
                        <tr>
                            <td>Total Recovered</td>
                            <td>{{ stats.countryStats.totalRecovered }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<style scoped>
h1 {
    font-weight: 500;
    font-size: 2.6rem;
    padding: 0.5rem 0;
}

h3 {
    font-size: 1.2rem;
}

select {
    text-align: center;
    min-width: 200px;
    width: 200px;
    background: var(--color-background-soft);
}

option {
    background: var(--color-background-soft);
}

table {
    min-width: 320px;
    width: 350px;
    padding: 10px 20px;
}

td {
    padding-left: 1rem;
}

.stats-page h1,
.stats-page h3 {
    text-align: center;
}
.container {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
}

.map-stats {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    flex-wrap: no-wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.svg {
    width: 90%;
    padding: 0 10px;
    aspect-ratio: 2 / 1;
}

@media (min-width: 1024px) {
    .map-stats {
        flex-direction: row;
    }
}
</style>
