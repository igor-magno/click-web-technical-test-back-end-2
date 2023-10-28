<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        return view('movie.index');
    }

    public function gridScrolling()
    {
        return view('movie.paginate-scroll');
    }

    public function gridButton()
    {
        return view('movie.paginate-button');
    }

    public function get(Request $request)
    {
        $page = $request->get('page') ?? '/titles?page=1';
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => "https://moviesdatabase.p.rapidapi.com$page",
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
            'previousPage' => $page == '/titles?page=1' ? null : '/titles?page=' . ($response->page - 1),
            'currentPage' => $response->page,
            'nextPage' => $response->next
        ], 200);
    }
}
