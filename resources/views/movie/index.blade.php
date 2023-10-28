<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ __('Movies') }}</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,600&display=swap" rel="stylesheet" />

    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="antialiased dark:bg-gray-600">
    <div class="w-screen h-screen flex flex-col md:flex-row justify-center items-center gap-4">
        <a href="{{ route('movie.paginate-scroll') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{ __('Movies in grid scroll') }}</a>
        <a href="{{ route('movie.paginate-button') }}" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{{ __('Movies in grid button') }}</a>
    </div>
</body>

</html>