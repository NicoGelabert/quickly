<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreServiceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'icon' => ['nullable', 'string'],
            'active' => ['required', 'boolean'],
            'short_description' => ['nullable', 'string'],
            'description' => ['nullable', 'string'],
            'attributes' => ['nullable', 'array'],
            'attributes.*.text' => ['nullable', 'string', 'min:0.01'],
            'image' => ['required', 'image'],
            'parent_id' => ['nullable', 'exists:categories,id'],
        ];
    }
}
