<script>
import { createTypedChart } from 'vue-chartjs'
import { Chart } from 'chart.js'
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

Chart.register(ChoroplethController, GeoFeature, ColorScale, ProjectionScale)

// Options for choropleth chart
const chartOptionsDefault = {
    showOutline: true,
    showGraticule: true,
    hover: {
        mode: null
    },
    plugins: {
        legend: {
            display: true
        }
    },
    scales: {
        projection: {
            axis: 'x',
            projection: 'equalEarth'
        },
        color: {
            display: false,
            axis: 'x'
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
    // get country polygon data on mount
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
    // dynamically update selected country based on store value (value: 1 or 0); factor in missing countries in polygon data
    computed: {
        selectedCountry() {
            const countryStore = useCountryStore()
            return countryStore.selectedCountry
        },
        chartData() {
            return {
                labels: this.geoCountries.map((d) => d.properties.name),
                datasets: [
                    {
                        label: 'Countries',
                        backgroundColor: (context) => {
                            if (context.dataIndex == null) {
                                return null
                            }
                            const value =
                                context.dataset.data[context.dataIndex]
                            return value.value > 0
                                ? 'rgb(111, 111, 235)'
                                : 'rgb(255, 255, 235)'
                        },
                        data: this.geoCountries.map((d) => ({
                            feature: d,
                            value:
                                !!this.selectedCountry &&
                                countries.getAlpha3Code(
                                    d.properties.name,
                                    'en'
                                ) &&
                                countries.getAlpha3Code(
                                    d.properties.name,
                                    'en'
                                ) ===
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
