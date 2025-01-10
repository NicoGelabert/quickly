<div class="flex" id="contact">
    <div class="container py-12 sm:w-1/2 bg-primary_light">
        <div class="max-w-2xl m-auto flex flex-col gap-6">
            <div class="flex flex-col gap-6">
                <h3>H3 - Headline</h3>
                <p class="mobile_text_large">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <form id="contactForm" action="{{ route('contact.store') }}" method="post" class="form">
                @csrf
                <div class="flex flex-col gap-6 w-full">
                    <input id="nameInput" type="text" name="name" placeholder="Su nombre" required>
                    <input id="emailInput" type="email" name="email" placeholder="Su correo electrónico" required>
                    <input id="phoneInput" type="tel" name="phone" placeholder="Su teléfono" required pattern="[0-9]{9}">
                    <select id="serviceInput" name="service" required>
                        <option value="">¿Qué necesita?</option>
                        <option value="Cerrajería">Cerrajería</option>
                        <option value="Electricidad">Electricidad</option>
                        <option value="Fontanería">Fontanería</option>
                        <option value="Persianas">Persianas</option>
                    </select>
                    
                    <!-- Casilla de verificación para Términos y Política -->
                    <div class="flex items-start gap-2">
                        <input type="checkbox" id="termsCheckbox" name="terms" required>
                        <label for="termsCheckbox" class="text-sm">
                            He leído y acepto los 
                            <a href="/terminos-y-condiciones" target="_blank" class="underline">Términos y Condiciones</a> y la 
                            <a href="/politica-de-privacidad" target="_blank" class="underline">Política de Privacidad</a>.
                        </label>
                    </div>
    
                    <div class="g-recaptcha" data-sitekey="6LfVW4kqAAAAAEdYw7ib6b04hXWw1e5IC2HBqsSR"></div>
    
                    <x-button class="btn btn-primary" id="subscribeBtn" type="submit" disabled>enviar <x-icons.send /></x-button>
    
                    <div id="loader_container" class="loader_container hidden_loader">
                        <div class="form_loader">
                            <div></div>
                            <div></div>
                        </div>
                        <span>{{__('Enviando...')}}</span>
                    </div>
                </div>
            </form>
            <div id="successMessage" class="mx-auto" style="display: none;">
                <h4 class="text-center">Mensaje Enviado!</h4>
                <img src="{{ asset('storage/common/mensaje-enviado.gif')}}" alt="Mensaje enviado">
            </div>
            <div id="errorMessage" class="mx-auto" style="display: none;">
                El envío falló. Vuelva a intentar, por favor.
            </div>
        </div>
    </div>
    <div class="hidden sm:block sm:w-1/2">
        <img class="h-full w-auto object-cover" src="{{ asset('storage/common/shaking_hands.jpg')}}">
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('contactForm');
        const subscribeBtn = document.getElementById('subscribeBtn');
        const termsCheckbox = document.getElementById('termsCheckbox');
        const loader = document.getElementById('loader_container');
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('errorMessage');

        // Habilitar/deshabilitar botón de enviar según el estado de la casilla
        termsCheckbox.addEventListener('change', function() {
            subscribeBtn.disabled = !termsCheckbox.checked;
        });

        form.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evitar el envío predeterminado del formulario

            subscribeBtn.style.display = 'none';
            loader.classList.remove('hidden_loader');

            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const phone = document.getElementById('phoneInput').value;
            const service = document.getElementById('serviceInput').value;
            const message = document.getElementById('messageInput').value;

            try {
                const response = await fetch('{{ route("contact.store") }}', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': '{{ csrf_token() }}'
                    },
                    body: JSON.stringify({ name, email, phone, service, message })
                });
                const data = await response.json();
                if (response.ok) {
                    successMessage.style.display = 'block';
                    form.style.display = 'none';
                } else {
                    errorMessage.style.display = 'block';
                }
            } catch (error) {
                errorMessage.style.display = 'block';
            } finally {
                loader.classList.add('hidden_loader');
            }
        });
    });
</script>
