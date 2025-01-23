<template>
  <div class="relative product-list">
    <!-- Indicador de carga -->
    <div v-if="loading" class="spinner-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="error">{{ error }}</div>

    <!-- Filtro de categorías y listado de productos -->
    <div class="container flex flex-col gap-8 md:gap-16">

      <!-- Botonera -->
      <ul class="flex flex-wrap justify-center gap-4">
        <li
        class=""
        :class="{ 'active-category': selectedCategory === null }"
        >
          <button
            @click="filterByCategory(null)"
            class="btn btn-secondary btn-products_list"
          >
            Todo
          </button>
        </li>
        <li v-for="category in categories" :key="category.id"
        class=""
        :class="{ 'active-category': selectedCategory === category.slug }"
        >
          <button
            @click="filterByCategory(category.slug)"
            class="btn btn-secondary btn-products_list"
          >
            {{ category.name }}
          </button>
        </li>
      </ul>
      <!-- Fin botonera -->

      <!-- Productos, con clase de opacidad condicional -->
      <div :class="{ 'loading-opacity': loading }" class="flex justify-center">
        <ul class="grid gap-4 lg:gap-y-12 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-screen-xl">
          <li v-for="product in products" :key="product.id" class="relative overflow-hidden flex flex-col items-center max-w-[225px]">
            <a :href="'/products/' + product.categories[0]?.slug + '/' + product.slug" class="aspect-w-3 aspect-h-2 block overflow-hidden relative max-w-[225px]">
              <div class="clock" v-if="product.quantity" >
                <ClockIcon /><p class="text-xs">A {{ product.quantity }} minutos de tí</p>
              </div>
              <img :src="product.image_url" alt="" class="card-image object-cover aspect-square rounded-lg" />
              <div class="flex flex-col py-4 gap-4 w-auto">
                <div class="flex justify-between items-center">
                  <div v-if="product.prices && product.prices.length > 0">
                    <ul class="font-bold text-sm text-gray_500">
                      <li v-for="price in product.prices" :key="price.id" class="stars"><StarIcon /> {{ price.number }}</li>
                    </ul>
                  </div>
                  <div v-if="product.categories && product.categories.length > 0" class="text-xs flex gap-2">
                    <ul class="font-bold text-xs">
                      <li class="bg-gray_200 text-gray_600 rounded-md py-1 px-2" v-for="category in product.categories" :key="category.id">{{ category.name }}</li>
                    </ul>
                  </div>
                </div>
                <h6 class="w-fit">{{ product.title }}</h6>
                <div class="flex gap-4 card-buttons">
                  <a class="btn btn-primary btn-products_list"><span>Llamar </span><BookIcon /></a>
                  <a class="btn btn-secondary btn-products_list"><SendIcon /></a>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>  

<script>
import axios from 'axios';
import BookIcon from '../icons/BookIcon.vue';
import SendIcon from '../icons/SendIcon.vue';
import StarIcon from '../icons/StarIcon.vue';
import ClockIcon from '../icons/ClockIcon.vue';

export default {
components: {
  // Registra el componente
  BookIcon,
  SendIcon,
  StarIcon,
  ClockIcon,
},
data() {
  return {
    products: [],  // Para almacenar los productos
    categories: [],  // Para almacenar las categorías
    loading: true,  // Para manejar el estado de carga
    error: null,    // Para manejar errores de la API
    selectedCategory: null,  // Para manejar la categoría seleccionada
  };
},
mounted() {
  // Llamamos a la función que obtiene las categorías y los productos cuando el componente se monta
  this.fetchCategories();
  this.fetchProducts();
},
methods: {
  // Obtener las categorías
  fetchCategories() {
    axios.get('/api/categories')  // Hacemos la petición a la API de categorías
      .then(response => {
        this.categories = response.data.data;  // Asignamos las categorías (data está envuelto en 'data')
      })
      .catch(error => {
        console.error("Error al obtener categorías:", error);
        this.error = "Ocurrió un error al cargar las categorías.";  // Mostramos un mensaje de error
      });
  },

  // Obtener productos con filtro de categoría
  fetchProducts() {
    const categorySlug = this.selectedCategory ? this.selectedCategory : '';  // Si hay categoría seleccionada, la pasamos
    axios.get('/api/products', {
      params: {
        category: categorySlug,  // Filtro por categoría
      },
    })
      .then(response => {
        this.products = response.data.data;  // Asignamos los productos (data está envuelto en 'data')
        this.loading = false;  // Cambiamos el estado de carga
      })
      .catch(error => {
        console.error("Error al obtener productos:", error);
        this.error = "Ocurrió un error al cargar los productos.";  // Mostramos un mensaje de error
        this.loading = false;  // Terminamos el estado de carga
      });
  },

  // Filtrar productos por categoría
  filterByCategory(slug) {
    this.selectedCategory = slug;  // Establecemos la categoría seleccionada
    this.loading = true;  // Activamos el estado de carga
    this.fetchProducts();  // Volvemos a cargar los productos filtrados
  },
},
};
</script>