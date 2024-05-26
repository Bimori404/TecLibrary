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
                <br>
                <div>
                    <label for="image">Imagen de portada:</label>
                    <input type="file" @change="onFileChange" required>
                </div>
                <br>
                <button type="submit">Agregar</button>
            </form>
        </div>
    </div>
</template>

<script>
import supabase from '../../supabase';
import { useToast } from 'vue-toast-notification';

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
            description: '',
            imageFile: null
        };
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
                let imageUrl = 'https://via.placeholder.com/150';
                if (this.imageFile) {
                    const formData = new FormData();
                    formData.append('file', this.imageFile);

                    const { data, error } = await supabase
                        .storage
                        .from('imagenes')
                        .upload(`portadas/${this.imageFile.name}`, this.imageFile);

                    if (error) throw error;

                    imageUrl = `${supabase.storage.from('imagenes').getPublicUrl(data.Key)}`;
                }

                const newItem = {
                    title: this.title,
                    description: this.description,
                    image: imageUrl
                };

                this.$emit('add-item', newItem);
                this.title = '';
                this.description = '';
                this.imageFile = null;
                this.close();
                $toast.success('Libro agregado exitosamente', {
                    position: 'bottom'
                });
            } catch (error) {
                console.error('Error adding book:', error);
                $toast.error('Error al agregar el libro', {
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