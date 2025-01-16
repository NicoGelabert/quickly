<?php

namespace App\Http\Controllers;

use App\Models\HomeHeroBanner;
use App\Models\Category;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $homeherobanners = HomeHeroBanner::all();
        $categories = Category::with('products.images')->get();
        return view('welcome', compact(
            'homeherobanners',
            'categories',
        ));
    }
}
