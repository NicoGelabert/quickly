<div class="container py-12 flex flex-col sm:flex-row-reverse gap-6 items-center" id="services">
    <div class="flex flex-col gap-6">
        <h2>H2 - Headline</h2>
        <p class="mobile_text_large">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
    <ul class="flex flex-wrap justify-evenly gap-6">
        @foreach ($services as $service)
        <li class="w-fit flex flex-col gap-4 items-center">
            <div class="icon">
                <div>
                    <img class="w-full max-h-20" src="{{ $service->image }}" alt="{{ $service->name }}">
                </div>
            </div>
            <p class="font-bold">{{ $service->name }}</p>
        </li>
        @endforeach
    </ul>
</div>