<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

// Route::get('/test-route', function () {
//     return response()->json(['message' => 'test route working']);
// });

