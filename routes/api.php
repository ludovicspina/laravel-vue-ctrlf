<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum', 'admin'])->get('/admin', function () {
    return response()->json(['message' => 'Bienvenue admin']);
});
