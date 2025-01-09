<div class="home-hero-banner" aria-label="Quickly">
        <ul class="">
            @foreach ($homeherobanners as $homeherobanner)
            <li class="mx-auto">
                <div class="flex flex-col justify-between md:items-stretch gap-12 px-4 pt-24 mx-auto md:flex-row">
                    <div class="flex flex-col justify-start gap-8 w-full md:w-1/2">
                        <hr />
                        
                        <h1 class="dark:text-white">{{ $homeherobanner->headline }}</h1>
                        <p class="">{{ $homeherobanner->description }}</p>
                        
                    </div>
                    <div class="flex w-full md:w-1/2 justify-end gap-4 h-auto overflow-hidden">
                        <div class="image-container flex flex-col justify-between max-h-[450px]">
                            <img src="{{ $homeherobanner->image }}" alt="{{ $homeherobanner->headline }}">                            
                        </div>
                        
                    </div>
                </div>
            </li>
            @endforeach
        </ul>
</div>