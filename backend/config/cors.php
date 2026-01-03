<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'storage/*'], //

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:3000', // URL Development Next.js
        'http://127.0.0.1:3000',
        // Nanti tambahkan domain production di sini, misal: 'https://masjid-alhuda.com'
    ],

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    // SANGAT PENTING: Set ke true agar cookie sesi (Sanctum) bisa lewat
    'supports_credentials' => true,

];
