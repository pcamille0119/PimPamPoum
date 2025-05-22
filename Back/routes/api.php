<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UtilisateurController;

// Exemple de route de login
Route::post('/login', [UtilisateurController::class, 'login']);
