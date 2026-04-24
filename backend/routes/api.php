<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DevController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('devs')->group(function () {
    Route::post('/', [DevController::class, 'store']);
    Route::get('/', [DevController::class, 'index']);
    Route::get('/{id}', [DevController::class, 'show']);
});