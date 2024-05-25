<template>
    <div class="contact-container">
        <!-- <h1>Contacto</h1> -->
        <p>Ponte en contacto con nosotros.</p>

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="form.name" required />
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico:</label>
                <input type="email" id="email" v-model="form.email" required />
            </div>
            <div class="form-group">
                <label for="message">Mensaje:</label>
                <textarea id="message" v-model="form.message" required></textarea>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ContactView',
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Aquí puedes añadir la lógica para manejar el envío del formulario,
            // como enviarlo a un servidor o mostrar un mensaje de confirmación.
            console.log('Formulario enviado:', this.form);
        }
    }
};
</script>

<style scoped>
.contact-container {
    padding: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

form button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

form button:hover {
    background-color: #0056b3;
}
</style>
