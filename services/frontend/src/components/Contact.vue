<script>
export default {
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
                console.log(name, email, message)
            }
        },
        resetForm() {
            this.name = ''
            this.email = ''
            this.message = ''
        }
    },
    computed: {
        formIsValid() {
            const { name, email, message } = this
            return (
                name.length > 0 &&
                /(.+)@(.+){2,}.(.+){2,}/.test(email) &&
                message.length > 0
            )
        }
    }
}
</script>

<template>
    <div class="contact-page">
        <h1 class="green">Contact</h1>
        <h3>Please get in touch with any requests or feedback</h3>
        <form
            class="contact-form"
            action="https://formsubmit.co/1163c830f441496d9db56de781ea6a16"
            method="POST"
            @reset.prevent="resetForm"
        >
            <div class="name-email">
                <input
                    type="hidden"
                    name="_subject"
                    value="Coronovirus Statistics: New message"
                />
                <label>Name</label>
                <input v-model="name" name="name" />
                <label>Email</label>
                <input v-model="email" name="email" />
            </div>

            <div>
                <label>Message</label>
                <textarea v-model="message" name="message"></textarea>
            </div>
            <div>
                <button type="submit">Submit</button>
                <button type="reset">Reset</button>
            </div>
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

textarea {
    width: 100%;
}

.contact-page {
    margin: 0 auto;
    width: 500px;
}
.contact-page h1,
.contact-page h3 {
    text-align: center;
}
.contact-form {
    display: flex;
    flex-direction: column;
    padding-top: 1rem;
}
.name-email {
    flex-direction: row;
}

/* @media (min-width: 1024px) {
  .contact-page h1,
  .contact-page h3 {
    text-align: left;
  }
} */
</style>
