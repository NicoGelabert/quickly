<div class="home-hero-banner" aria-label="Quickly">
        <ul class="container">
            @foreach ($homeherobanners as $homeherobanner)
            <li class="mx-auto py-12 flex flex-col sm:flex-row sm:items-center gap-12">
                <div class="sm:w-1/2 flex flex-col gap-4">
                    <h1 class="dark:text-white">{{ $homeherobanner->headline }}</h1>
                    <p class="mobile_text_large">{{ $homeherobanner->description }}</p>
                </div>
                <div class="sm:w-1/2">
                    <img class="w-full max-w-xl" src="{{ $homeherobanner->image }}" alt="{{ $homeherobanner->headline }}">
                </div>
            </li>
            @endforeach
        </ul>
</div>