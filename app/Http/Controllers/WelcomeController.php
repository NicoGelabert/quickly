<?php

namespace App\Http\Controllers;

use App\Models\HomeHeroBanner;
use App\Models\Feature;
use App\Models\Service;
use App\Models\Tag;
use App\Models\Client;
use App\Models\Project;
use App\Models\Faq;
use Illuminate\Http\Request;

class WelcomeController extends Controller
{
    public function index()
    {
        $homeherobanners = HomeHeroBanner::all();
        return view('welcome', compact(
            'homeherobanners',
        ));
    }
}
