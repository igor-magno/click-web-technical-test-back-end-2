<?php

use App\Http\Controllers\MovieController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [MovieController::class, 'index'])->name('movie.index');
Route::get('/paginate-scroll', [MovieController::class, 'gridScrolling'])->name('movie.paginate-scroll');
Route::get('/paginate-button', [MovieController::class, 'gridButton'])->name('movie.paginate-button');
Route::get('/movie', [MovieController::class, 'get'])->name('movie.get');
