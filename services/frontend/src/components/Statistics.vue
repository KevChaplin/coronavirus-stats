<script>
export default {
  data() {
    return {
      allCountries: [],
      allCountriesSorted: [],
      selectedCountry: '',
      isCountryData: false,
      countryStats: {
        activeCases: "0",
        country: '',
        lastUpdated: '',
        newCases: "0",
        newDeaths: "0",
        totalCases: "0",
        totalDeaths: "0",
        TotalRecoverd: "0"
      }
    };
  },
  // get all countries for use in select box, sorted with 'World' at top
  async mounted() {
    const response = await fetch("http://localhost:5000/api/v1")
    this.allCountries = await response.json()
    const regex = /^world$/i
    this.allCountriesSorted =
      [this.allCountries.find((item) => regex.test(item))]
      .concat(
        this.allCountries.filter(item => !regex.test(item) && item != '').sort()
      )
      console.log('fetch all countries')
      // TO DO: keep in store
  },
  methods: {
    // on select country, get that countries data
    async handleChange() {
      if (this.selectedCountry) {
        const response = await fetch(`http://localhost:5000/api/v1/${this.selectedCountry}`)
        const data = await response.json()
        // TO DO: store data
        if(data) { this.isCountryData = true }
        this.countryStats = {
          activeCases: data["Active Cases_text"] || "0",
          country: data["Country_text"] || "",
          lastUpdated: data["Last Update"] || "",
          newCases: data["New Cases_text"] || "0",
          newDeaths: data["New Deaths_text"] || "0",
          totalCases: data["Total Cases_text"] || "",
          totalDeaths: data["Total Deaths_text"] || "",
          totalRecovered: data["Total Recovered_text"] || ""
        };
      }
    }
  }
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Statistics Page</h1>
    <h3>Coronavirus statistics by individual country, or the whole world</h3>
    <div class="stats">
      <select class="green" @change="handleChange" v-model="selectedCountry">
      <option disabled value="">Select country</option>
      <option v-for="country in allCountriesSorted" :value="country">{{ country }}</option>
    </select>
    <table v-if="this.isCountryData">
      <tbody>
        <tr>
          <td>Active Cases</td>
          <td>{{ countryStats.activeCases }}</td>
        </tr>
        <tr>
          <td>Last Update</td>
          <td>{{ countryStats.lastUpdated }}</td>
        </tr>
        <tr>
          <td>New Cases</td>
          <td>{{ countryStats.newCases }}</td>
        </tr>
        <tr>
          <td>New Deaths</td>
          <td>{{ countryStats.newDeaths }}</td>
        </tr>
        <tr>
          <td>Total Cases</td>
          <td>{{ countryStats.totalCases }}</td>
        </tr>
        <tr>
          <td>Total Deaths</td>
          <td>{{ countryStats.totalDeaths }}</td>
        </tr>
        <tr>
          <td>Total Recovered</td>
          <td>{{ countryStats.totalRecovered }}</td>
        </tr>
      </tbody>
    </table>
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
  width: 200px;
  background: var(--color-background-soft);
}

option {
  background: var(--color-background-soft);
}

td {
  padding-left: 1rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}
.stats {
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
