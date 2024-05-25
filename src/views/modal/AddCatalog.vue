<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Agregar Nuevo Libro</h2>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="title">Título:</label>
                    <input type="text" id="title" v-model="title" required>
                </div>
                <div>
                    <label for="description">Descripción:</label>
                    <textarea id="description" v-model="description" required></textarea>
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AddModalCatalog',
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            title: '',
            description: ''
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitForm() {
            const newItem = {
                title: this.title,
                description: this.description,
                image: 'https://via.placeholder.com/150'  // URL de imagen por defecto
            };
            this.$emit('add-item', newItem);
            this.title = '';
            this.description = '';
            this.close();
        }
    }
};
</script>

<style>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    text-align: left;
}

.close {
    float: right;
    font-size: 24px;
    cursor: pointer;
}
</style>


<!-- 

    <template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Agregar Nuevo Libro</h2>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="title">Título:</label>
                    <input type="text" id="title" v-model="title" required>
                </div>
                <div>
                    <label for="description">Descripción:</label>
                    <textarea id="description" v-model="description" required></textarea>
                </div>
                <button type="submit">Agregar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalView',
    props: {
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            title: '',
            description: ''
        };
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitForm() {
            const newItem = {
                title: this.title,
                description: this.description,
                image: 'https://via.placeholder.com/150'  // Puedes permitir al usuario ingresar una URL de imagen si lo deseas
            };
            this.$emit('add-item', newItem);
            this.title = '';
            this.description = '';
            this.close();
        }
    }
};
</script>

<style>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background: white;
    padding: 20px;
    border-radius: 4px;
    width: 300px;
    text-align: left;
}

.close {
    float: right;
    font-size: 24px;
    cursor: pointer;
}
</style>


-->