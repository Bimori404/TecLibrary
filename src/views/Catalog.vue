<template>
    <div>
        <p>Bienvenido al catálogo de la biblioteca.</p>
        <button @click="showModal = true">Agregar Libro</button>
        <div v-if="loading">Cargando libros...</div>
        <div v-else-if="catalogItems.length === 0">No hay libros en el catálogo.</div>
        <div class="cards-container" v-else>
            <div class="card" v-for="item in catalogItems" :key="item.id">
                <img :src="item.image" :alt="item.title">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <button @click="removeItem(item.id)">Eliminar</button>
                <button @click="editItem(item)">Actualizar</button>
            </div>
        </div>
        <AddModalCatalog :isVisible="showModal" @close="showModal = false" @add-item="addNewItem"></AddModalCatalog>
        <EditModalCatalog :isVisible="showEditModal" :item="selectedItem" @close="showEditModal = false"
            @update-item="updateItem"></EditModalCatalog>
    </div>
</template>

<script>
import supabase from '../supabase';
import AddModalCatalog from './modal/AddCatalog.vue';
import EditModalCatalog from './modal/EditCatalog.vue';

export default {
    name: 'CatalogoView',
    components: {
        AddModalCatalog,
        EditModalCatalog
    },
    data() {
        return {
            catalogItems: [],
            showModal: false,
            showEditModal: false,
            selectedItem: null,
            loading: true
        };
    },
    async created() {
        await this.fetchBooks();
    },
    methods: {
        async fetchBooks() {
            const { data: books, error } = await supabase
                .from('libros')
                .select('*');
            if (error) {
                console.error('Error fetching books:', error);
            } else {
                this.catalogItems = books.map(book => ({
                    id: book.id_libro,
                    title: book.titulo,
                    description: book.descripcion,
                    image: 'https://via.placeholder.com/150' // URL de imagen por defecto
                }));
            }
            this.loading = false;
        },
        async addNewItem(newItem) {
            const { data, error } = await supabase
                .from('libros')
                .insert([{ titulo: newItem.title, descripcion: newItem.description }])
                .select();
            if (error) {
                console.error('Error adding book:', error);
            } else {
                newItem.id = data[0].id_libro;
                this.catalogItems.push(newItem);
            }
            this.showModal = false;
        },
        async removeItem(id) {
            const { error } = await supabase
                .from('libros')
                .delete()
                .eq('id_libro', id);
            if (error) {
                console.error('Error removing book:', error);
            } else {
                this.catalogItems = this.catalogItems.filter(item => item.id !== id);
            }
        },
        editItem(item) {
            this.selectedItem = { ...item };
            this.showEditModal = true;
        },
        async updateItem(updatedItem) {
            const { error } = await supabase
                .from('libros')
                .update({ titulo: updatedItem.title, descripcion: updatedItem.description })
                .eq('id_libro', updatedItem.id);
            if (error) {
                console.error('Error updating book:', error);
            } else {
                const index = this.catalogItems.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    this.catalogItems.splice(index, 1, updatedItem);
                }
            }
            this.showEditModal = false;
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

button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

@media screen and (min-width: 393px) {
    .cards-container {
        padding-left: 14%;
        /* border: solid rgb(0, 255, 255) 1px; */
    }
}
</style>


<!-- 

<template>
    <div style="padding-top: 300%;">
        <p>Bienvenido al catálogo de la biblioteca.</p>
        <button @click="showModal = true">Agregar Libro</button>
        <div class="cards-container">
            <div class="card" v-for="item in catalogItems" :key="item.id">
                <img :src="item.image" :alt="item.title">
                <h2>{{ item.title }}</h2>
                <p>{{ item.description }}</p>
                <button @click="removeItem(item.id)">Eliminar</button>
            </div>
        </div>
        <ModalView :isVisible="showModal" @close="showModal = false" @add-item="addNewItem"></ModalView>
    </div>
</template>

<script>
import ModalView from './ModalCatalog.vue';

export default {
    name: 'CatalogoView',
    components: {
        ModalView
    },
    data() {
        return {
            catalogItems: [
                {
                    id: 1,
                    image: 'https://via.placeholder.com/150',
                    title: 'El Gran Gatsby',
                    description: 'Una novela escrita por el autor estadounidense F. Scott Fitzgerald.'
                },
                {
                    id: 2,
                    image: 'https://via.placeholder.com/150',
                    title: 'Cien Años de Soledad',
                    description: 'Una novela del escritor colombiano Gabriel García Márquez.'
                },
                {
                    id: 3,
                    image: 'https://via.placeholder.com/150',
                    title: 'Orgullo y Prejuicio',
                    description: 'Una novela romántica de la autora inglesa Jane Austen.'
                },
                {
                    id: 4,
                    image: 'https://via.placeholder.com/150',
                    title: '1984',
                    description: 'Una novela distópica del autor inglés George Orwell.'
                },
                {
                    id: 5,
                    image: 'https://via.placeholder.com/150',
                    title: 'Don Quijote de la Mancha',
                    description: 'Una novela escrita por el español Miguel de Cervantes.'
                },
                {
                    id: 6,
                    image: 'https://via.placeholder.com/150',
                    title: 'Matar a un Ruiseñor',
                    description: 'Una novela de la autora estadounidense Harper Lee.'
                }
            ],
            nextId: 7, // para asignar id únicos a nuevos elementos
            showModal: false
        };
    },
    methods: {
        addItem() {
            this.showModal = true;
        },
        addNewItem(newItem) {
            newItem.id = this.nextId++;
            this.catalogItems.push(newItem);
        },
        removeItem(id) {
            this.catalogItems = this.catalogItems.filter(item => item.id !== id);
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

button {
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}
</style>


-->