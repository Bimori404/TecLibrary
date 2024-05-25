<template>
    <div class="help-container">
        <!-- <h1>Ayuda y Soporte</h1> -->
        <p>Encuentra ayuda y soporte aquí.</p>

        <div class="container">
            <div class="card">
                <h2>Preguntas Frecuentes</h2>
                <p>Encuentra respuestas a las preguntas más comunes.</p>
                <button @click="goToFAQ">Ver FAQ</button>
            </div>

            <div class="card">
                <h2>Soporte Técnico</h2>
                <p>¿Tienes problemas técnicos? Estamos aquí para ayudar.</p>
                <button @click="goToTechnicalSupport">Obtener Soporte</button>
            </div>

            <div class="card">
                <h2>Contacto</h2>
                <p>¿Necesitas más ayuda? Contáctanos directamente.</p>
                <button @click="goToContact">Contactar</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelpView',
    methods: {
        goToFAQ() {
            // Lógica para navegar a la sección de FAQ
        },
        goToTechnicalSupport() {
            // Lógica para navegar a la sección de soporte técnico
        },
        goToContact() {
            // Lógica para navegar a la sección de contacto
        }
    }
};
</script>

<style scoped>
.help-container {
    padding: 20px;
}

.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.card h2 {
    margin-top: 0;
}

.card button {
    background-color: #007BFF;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.card button:hover {
    background-color: #0056b3;
}

@media screen and (min-width: 393px) {
    .container {
        padding-left: 5%;
        /* border: solid rgb(0, 255, 255) 1px; */
    }
}

</style>
