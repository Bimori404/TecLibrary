<template>
    <div>
        <!-- <h1>Préstamos y Reservas</h1> -->
        <!-- <p>Gestiona tus préstamos y reservas aquí.</p> -->
        <div v-if="reservedItems.length === 0">No hay libros prestados o reservados.</div>
        <div class="cards-container" v-else>
            <div class="card" v-for="item in reservedItems" :key="item.id">
                <img :src="item.image" :alt="item.title">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <button @click="removeReservation(item.id)">Quitar</button>
            </div>
        </div>
    </div>
</template>

<script>
import { useToast } from 'vue-toast-notification';

export default {
    name: 'ReservationsView',
    data() {
        return {
            reservedItems: []
        };
    },
    created() {
        this.fetchReservedItems();
    },
    methods: {
        fetchReservedItems() {
            this.reservedItems = JSON.parse(localStorage.getItem('reservations')) || [];
        },
        removeReservation(id) {
            const $toast = useToast();
            this.reservedItems = this.reservedItems.filter(item => item.id !== id);
            localStorage.setItem('reservations', JSON.stringify(this.reservedItems));
            $toast.success('Libro removido exitosamente', {
                position: 'bottom'
            });
        }
    }
};
</script>

<style>
.cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 20px;
    width: 200px;
    text-align: center;
}

.card img {
    width: 100%;
    height: auto;
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
}

.card h2 {
    font-size: 1.2em;
    margin: 10px 0;
}

.card p {
    font-size: 1em;
    color: #666;
}

.card button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.card button:hover {
    background-color: #d32f2f;
}
</style>
