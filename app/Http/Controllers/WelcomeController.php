<?php

namespace App\Http\Controllers;

use App\Models\HomeHeroBanner;
use App\Models\Service;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $homeherobanners = HomeHeroBanner::all();
        $services = Service::all();
        return view('welcome', compact(
            'homeherobanners',
            'services',
        ));
    }
}
