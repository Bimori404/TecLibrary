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
                <div>
                    <label for="image">Imagen de portada:</label>
                    <input type="file" @change="onFileChange">
                </div>
                <button type="submit">Actualizar</button>
            </form>
        </div>
    </div>
</template>

<script>
import supabase from '../../supabase';
import { useToast } from 'vue-toast-notification';

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
            default: () => ({ title: '', description: '', image: '' })
        }
    },
    data() {
        return {
            title: this.item ? this.item.title : '',
            description: this.item ? this.item.description : '',
            imageFile: null
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
        onFileChange(e) {
            this.imageFile = e.target.files[0];
        },
        async submitForm() {
            const $toast = useToast();

            try {
                // Subir imagen
                let imageUrl = this.item.image; // Mantener la imagen actual si no se cambia
                if (this.imageFile) {
                    const formData = new FormData();
                    formData.append('file', this.imageFile);

                    const { data, error } = await supabase
                        .storage
                        .from('imagenes')
                        .upload(`portadas/${this.imageFile.name}`, this.imageFile); // Ajustar la clave

                    if (error) throw error;

                    imageUrl = `${supabase.storage.from('imagenes').getPublicUrl(data.Key)}`;
                }

                const updatedItem = {
                    ...this.item,
                    title: this.title,
                    description: this.description,
                    image: imageUrl
                };

                this.$emit('update-item', updatedItem);
                $toast.success('Libro actualizado exitosamente', {
                    position: 'bottom'
                });
            } catch (error) {
                console.error('Error updating book:', error);
                $toast.error('Error al actualizar el libro', {
                    position: 'bottom'
                });
            }
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
