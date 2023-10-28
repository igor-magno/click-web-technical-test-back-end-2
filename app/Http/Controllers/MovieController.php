<?php

namespace App\Http\Controllers;

use App\Services\RapidApiService;
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
        try {
            $page = $request->get('page') ?? '/titles?page=1';
            $response = RapidApiService::get($page);
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
        } catch (\Throwable $th) {
            return response($th->getMessage(), 500);
        }
    }
}
