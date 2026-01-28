<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. The settings below are a good default for local dev.
    |
    */

    // paths that should be CORS accessible
    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    // allowed origins (do NOT use ['*'] when credentials are used)
    'allowed_origins' => [
        env('FRONTEND_URL', 'http://127.0.0.1:5173'),
    ],

    // If you need to allow subdomains you can use patterns
    'allowed_origins_patterns' => [],

    // allowed HTTP methods
    'allowed_methods' => ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],

    // allowed request headers
    'allowed_headers' => ['Content-Type', 'X-Requested-With', 'Authorization', 'Accept', 'X-XSRF-TOKEN'],

    // expose these headers to the browser
    'exposed_headers' => [],

    // allow cookies / credentials to be sent
    'supports_credentials' => true,
];
