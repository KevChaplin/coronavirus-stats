import { defineStore } from 'pinia'

export const useCountryStore = defineStore('countryStore', {
    state: () => ({
        selectedCountry: ''
    }),
    actions: {
        set(country) {
            if (!country || country.lowercase() == 'world') {
                this.selectedCountry = ''
            } else {
                this.selectedCountry = country
            }
        }
    }
})