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
            <input
                type="hidden"
                name="_subject"
                value="Coronovirus Statistics: New message"
            />
            <input type="hidden" name="_cc" value="info@corpy.co.jp" />
            <div class="name-email">
                <div class="top-row-item">
                    <label>Name</label>
                    <input v-model="name" name="name" />
                </div>
                <div class="top-row-item">
                    <label>Email</label>
                    <input v-model="email" name="email" />
                </div>
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

label {
    padding: 1rem 1rem;
    font-size: 1.25rem;
}

input {
    width: 90%;
    line-height: 2rem;
}

textarea {
    margin-top: 1rem;
    padding: 1rem 1rem;
    width: 95%;
}

button[type='submit'],
button[type='reset'] {
    background-color: #4caf50;
    color: #ffffff;
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 0.25rem;
    margin-right: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

button[type='submit']:hover,
button[type='reset']:hover {
    background-color: #ffffff;
    color: #4caf50;
    box-shadow: 0px 0px 5px rgba(76, 175, 80, 0.5);
}

button[type='reset'] {
    background-color: #e53935;
}

button[type='reset']:hover {
    background-color: #ffffff;
    color: #e53935;
    box-shadow: 0px 0px 5px rgba(229, 57, 53, 0.5);
}

.contact-page {
    margin: 0 auto;
    max-width: 700px;
}
.contact-page h1,
.contact-page h3 {
    text-align: center;
}
.contact-form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1rem;
    width: 100%;
}
.name-email {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    justify-content: space-between;
}
.top-row-item {
    width: 100%;
}

@media (min-width: 1024px) {
    .name-email {
        flex-direction: row;
    }
    .top-row-item {
        width: 45%;
    }
}
</style>
