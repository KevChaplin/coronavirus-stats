<script>
const aga = {
  data() {
    return {
      name: '',
      email: '',
      message: ''
    }
  },
  methods: {
    submitMessage() {
      if (!this.formIsValid) {
        return
      } else {
        const { name, email, message } = this
      }
    }
  },
  computed: {
    formIsValid() {
      const { name, email, message } = this
      return name.length > 0 && /(.+)@(.+){2,}.(.+){2,}/.test(email) && message.length > 0
    }
  }
}

export { aga }
</script>

<template >
  <div class="contact-page">
    <h1 class="green">Contact</h1>
    <h3>Please get in touch with any requests or feedback</h3>
    <form @submit.prevent="submit" @reset="onReset">
      <div>
        <label>name</label>
        <input v-model="name" />
      </div>
  
      <div>
        <label>email</label>
        <input v-model="email" />
      </div>
  
      <div>
        <label>message</label>
        <textarea v-model="message"></textarea>
      </div>
  
      <button type="submit">submit</button>
      <button type="reset">reset</button>
    </form>
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

.contact-page h1,
.contact-page h3 {
  text-align: center;
}
form {
  padding-top: 1rem;
}

/* @media (min-width: 1024px) {
  .contact-page h1,
  .contact-page h3 {
    text-align: left;
  }
} */
</style>
