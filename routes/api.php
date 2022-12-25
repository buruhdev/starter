<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => '/v1'], function () {
    Route::group(['prefix' => '/auth/'], function () {
        Route::post('/login', [\App\Http\Controllers\Api\V1\Auth\LoginController::class, 'index']);
        Route::get('/logout', [\App\Http\Controllers\Api\V1\Auth\LogoutController::class, 'index'])->middleware('auth:api');
    });

    Route::post('/profile/image/temp', [\App\Http\Controllers\Api\V1\ProfileController::class, 'storeTempImageProfile'])->middleware('auth:api');
    Route::put('/profile/image/{profile}', [\App\Http\Controllers\Api\V1\ProfileController::class, 'updateImage'])->middleware('auth:api');
    Route::apiResource('profile', \App\Http\Controllers\Api\V1\ProfileController::class)
        ->except(['store', 'show', 'destroy'])
        ->middleware('auth:api');
});
