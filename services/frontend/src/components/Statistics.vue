<script>
export default {
  data() {
    return {
      allCountries: [],
      allCountriesSorted: []
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
}

}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Statistics Page</h1>
    <h3>Select country below</h3>
    <div class="stats">

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

.greetings h1,
.greetings h3 {
  text-align: center;
}
.stats {
  padding-top: 1rem;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
