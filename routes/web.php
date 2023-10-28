<?php

use Illuminate\Http\Request;
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

Route::get('/', function () {
    return view('movie.index');
});

Route::get('/paginate-scroll', function () {
    return view('movie.paginate-scroll');
})->name('movie.paginate-scroll');

Route::get('/movie', function (Request $request) {
    $page = $request->get('page') ?? 1;
    $curl = curl_init();
    curl_setopt_array($curl, [
        CURLOPT_URL => "https://moviesdatabase.p.rapidapi.com/titles?page={$page}",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => [
            "X-RapidAPI-Host: " . env('X_RapidAPI_Host'),
            "X-RapidAPI-Key: " . env('X_RapidAPI_Key')
        ],
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    }
    $response = json_decode($response);
    $movies = array_map(function ($movie) {
        return (object)[
            'cover' => $movie->primaryImage ? (object)[
                'url' => $movie->primaryImage->url,
                'width' => $movie->primaryImage->width ?? null,
                'height' => $movie->primaryImage->height ?? null,
            ] : null,
            'title' => $movie->titleText->text ?? $movie->originalTitleText->text ?? '',
            'year' => $movie->releaseYear->year ?? ''
        ];
    }, $response->results);
    return response()->json((object)[
        'movies' => $movies,
        'requestPage' => $page,
        'nextPage' => $page + 1
    ], 200);
});
