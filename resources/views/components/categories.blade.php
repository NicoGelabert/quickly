<div class="container py-12 lg:py-24 flex flex-col sm:flex-row-reverse gap-6 items-center" id="services">
    <div class="flex flex-col gap-6 sm:w-1/2">
        <h2>Profesionales en Fuengirola</h2>
        <p class="mobile_text_large">Contacta con los prestadores de servicio y domina la urgencia.</p>
        <div id="products_selected"></div>
    </div>
    <div class="sm:w-1/2 flex justify-center">
        <ul class="flex flex-wrap justify-evenly gap-6 max-w-72">
            @foreach ($categories as $category)
            <li class="w-fit flex flex-col gap-4 items-center">
                <button class="icon" onclick="showProducts({{ json_encode($category->products) }}, '{{ addslashes($category->name) }}')">
                    <div>
                        <img class="w-full max-h-20" src="{{ $category->image }}" alt="{{ $category->name }}">
                    </div>
                </button>
                <p class="font-bold">{{ $category->name }}</p>
            </li>
            @endforeach
        </ul>
    </div>
</div>

<script>
    // Función para mostrar los productos
    function showProducts(products, categoryName) {
        const productsSelected = document.getElementById('products_selected');
        
        // Limpiar el contenido anterior
        productsSelected.innerHTML = '';

        // Verificar si hay productos disponibles
        if (!products || products.length === 0) {
            productsSelected.innerHTML = `<p>No hay productos disponibles para la categoría <strong>${categoryName}</strong>.</p>`;
            return;
        }

        // Crear encabezado para la categoría
        const header = document.createElement('h6');
        header.textContent = `Profesionales de ${categoryName}`;
        productsSelected.appendChild(header);

        // Crear lista de productos
        const ul = document.createElement('ul');
        
        products.forEach(product => {
            const li = document.createElement('li');

            // Verificar si el producto tiene imágenes asociadas
            if (product.images && product.images.length > 0) {
                // Usar la primera imagen del producto
                const img = document.createElement('img');
                img.src = product.images[0].url; // Acceder a `url` en lugar de `image_url`
                img.alt = product.title || 'Producto sin título'; // Texto alternativo

                // Crear el título del producto
                const title = document.createElement('span');
                title.textContent = product.title || 'Producto sin título';

                // Agregar la imagen y el título al <li>
                li.appendChild(img);
                li.appendChild(title);
            } else {
                const noImageText = document.createElement('span');
                noImageText.textContent = `${product.title} (Sin imagen)`;
                li.appendChild(noImageText);
            }

            // Agregar el <li> al <ul>
            ul.appendChild(li);
        });

        // Insertar la lista en el div
        productsSelected.appendChild(ul);
    }
</script>