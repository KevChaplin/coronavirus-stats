<template>
    <div class="greetings">
        <h1 class="green">Welcome to Coronovirus Stats</h1>
        <h3>Up-to-date Coronovirus statistics worldwide</h3>
        <div class="intro">
            <p>
                Statistics courtesy of:
                <a
                    href="https://covid-19.dataflowkit.com/"
                    target="_blank"
                    rel="noopener"
                    >covid-19.dataflowkit.com</a
                >
            </p>
            <p>
                Original data source:
                <a
                    href="https://www.worldometers.info/coronavirus/#countries"
                    target="_blank"
                    rel="noopener"
                    >www.worldometers</a
                >
            </p>
            <p>
                Note: As of the 1st of February 2023, Coronovirus statistics are
                updated daily, reset time midnight GMT+0.
            </p>
            <p>
                For more information on how the Coronovirus data is gathered and
                more, visit
                <a
                    href="https://www.worldometers.info/faq/"
                    target="_blank"
                    rel="noopener"
                    >www.worldometers.info/faq/</a
                >
            </p>
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
.intro {
    padding-top: 1rem;
}

/* @media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
</style>
