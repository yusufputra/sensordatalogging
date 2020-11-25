<?php

use App\Http\Controllers\DataController;
use App\Http\Controllers\SensorController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ZoneController;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('register', [UserController::class,'register']);
Route::post('login', [UserController::class,'login']);
Route::get('user', [UserController::class,'getAuthenticatedUser'])->middleware('jwt.verify');

Route::group(['middleware' => 'jwt.verify'], function () {
    Route::prefix('zone')->group(function () {
        Route::post('create', [ZoneController::class,'create']);
        Route::get('all',[ZoneController::class,'getAll']);
        Route::get('id/{id}',[ZoneController::class,'getById']);
    });
    Route::prefix('sensor')->group(function () {
        Route::post('create',[SensorController::class,'create']);
        Route::get('all',[SensorController::class,'getAll']);
        Route::get('id/{id}',[SensorController::class,'getById']);
    });

    Route::prefix('datalog')->group(function () {
        Route::post('create',[DataController::class,'create']);
        Route::get('all',[DataController::class,'getAll']);
        Route::get('id/{id}',[DataController::class,'getById']);
    });
});