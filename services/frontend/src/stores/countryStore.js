import { defineStore } from 'pinia'

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
