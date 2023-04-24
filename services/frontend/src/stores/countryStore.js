import { defineStore } from 'pinia'

// for storing user selected country
export const useCountryStore = defineStore('countryStore', {
    state: () => ({
        selectedCountry: ''
    }),
    actions: {
        set(country) {
            if (!country || country.toLowerCase() == 'world') {
                this.selectedCountry = ''
            } else {
                this.selectedCountry = country
            }
        }
    }
})

// for storing list of countries
export const useAllCountriesStore = defineStore('allCountrieStore', {
    state: () => ({
        allCountries: []
    }),
    actions: {
        set(countriesArr) {
            if (countriesArr.length > 0) {
                this.allCountries = countriesArr
            }
        }
    }
})

// for storing selected country's data
export const useSelectedCountryDataStore = defineStore('selectedCountryDataStore', {
    state: () => ({
        selectedCountryData: {}
    }),
    actions: {
        set(selectedCountryData) {
            if (selectedCountryData) {
                this.selectedCountryData = selectedCountryData
            }
        }
    }
})