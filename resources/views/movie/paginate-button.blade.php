<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ __('movie.film_catalog') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="antialiased dark:bg-gray-600">
    <div class="p-8">
        <div class="flex justify-center items-center">
            <h2 class="text-4xl text-center font-extrabold dark:text-white">{{ __('movie.film_catalog') }}</h2>
        </div>
        <div class="flex justify-center items-center p-4">
            <div class="paginate-buttons-group inline-flex rounded-md shadow-sm hidden" role="group">
            </div>
        </div>
        <div id="movies-grid" class="movies-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 p-4"></div>
        <div class="flex justify-center items-center p-4">
            <div class="paginate-buttons-group inline-flex rounded-md shadow-sm hidden" role="group">
            </div>
        </div>
    </div>
    <script src="assets/js/paginate-button.js"></script>
</body>

</html>