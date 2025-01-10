@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $class]) }}>
        {{ $slot }}
    </a>
@else
    <button {{ $attributes->merge(['type' => $type, 'class' => $class]) }}>
        @if (isset($icon))
            <span class="icon-container mr-2">
                {!! $icon !!}
            </span>
        @endif
        {{ $slot }}
    </button>
@endif