<script>
import { createTypedChart } from 'vue-chartjs'
import { Chart, Tooltip } from 'chart.js'
import * as countries from 'i18n-iso-countries'
import countriesEnglish from 'i18n-iso-countries/langs/en.json'
import { useCountryStore } from '../stores/countryStore.js'
countries.registerLocale(countriesEnglish)

import {
    ChoroplethController,
    GeoFeature,
    ColorScale,
    ProjectionScale
} from 'chartjs-chart-geo'
import { topojson } from 'chartjs-chart-geo'

Chart.register(
    ChoroplethController,
    GeoFeature,
    ColorScale,
    ProjectionScale,
    Tooltip
)

const chartOptionsDefault = {
    showOutline: true,
    showGraticule: true,
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        projection: {
            axis: 'x',
            projection: 'equalEarth'
        }
    }
}

const Choropleth = createTypedChart('choropleth', 'choropleth')

export default {
    name: 'MapChart',
    components: { Choropleth },
    data() {
        return {
            chartOptions: chartOptionsDefault,
            isData: false,
            geoCountries: {}
        }
    },
    async mounted() {
        const response = await fetch(
            'https://unpkg.com/world-atlas@2.0.2/countries-110m.json'
        )
        const countriesTopoJson = await response.json()
        this.geoCountries = topojson.feature(
            countriesTopoJson,
            countriesTopoJson.objects.countries
        ).features
        this.isData = true
    },
    computed: {
        selectedCountry() {
            const countryStore = useCountryStore()
            console.log('store',countryStore.selectedCountry)
            return countryStore.selectedCountry
        },
        chartData() {
            return {
                labels: this.geoCountries.map((d) => d.properties.name),
                datasets: [
                    {
                        label: 'Countries',
                        data: this.geoCountries.map((d) => ({
                            feature: d,
                            value:
                                !!this.selectedCountry &&
                                countries.getAlpha3Code(d.properties.name, 'en') ===
                                    countries.getAlpha3Code(
                                        this.selectedCountry,
                                        'en'
                                    )
                                    ? 1
                                    : 0
                        }))
                    }
                ]
            }
        }
    }
}
</script>

<template>
    <Choropleth v-if="this.isData" :data="chartData" :options="chartOptions" />
</template>
