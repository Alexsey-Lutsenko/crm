<?php

use App\Http\Controllers\api\UserListController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('add', [UserListController::class, 'add']);
Route::patch('update/{id}', [UserListController::class, 'update']);
Route::get('get', [UserListController::class, 'get']);
Route::delete('remove/{id}', [UserListController::class, 'remove']);
