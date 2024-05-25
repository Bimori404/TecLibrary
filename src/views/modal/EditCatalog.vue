<template>
    <div class="modal" v-if="isVisible">
        <div class="modal-content">
            <span class="close" @click="close">&times;</span>
            <h2>Actualizar Libro</h2>
            <form @submit.prevent="submitForm">
                <div>
                    <label for="title">Título:</label>
                    <input type="text" id="title" v-model="title" required>
                </div>
                <div>
                    <label for="description">Descripción:</label>
                    <textarea id="description" v-model="description" required></textarea>
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EditModalCatalog',
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        item: {
            type: Object,
            required: false,
            default: () => ({ title: '', description: '' })
        }
    },
    data() {
        return {
            title: this.item ? this.item.title : '',
            description: this.item ? this.item.description : ''
        };
    },
    watch: {
        item: {
            handler(newItem) {
                if (newItem) {
                    this.title = newItem.title || '';
                    this.description = newItem.description || '';
                }
            },
            immediate: true,
            deep: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        submitForm() {
            const updatedItem = {
                ...this.item,
                title: this.title,
                description: this.description
            };
            this.$emit('update-item', updatedItem);
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
