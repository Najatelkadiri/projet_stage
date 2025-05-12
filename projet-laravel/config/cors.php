<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Options
    |--------------------------------------------------------------------------
    |
    | Here you can specify the CORS options for your application. These options
    | determine which origins, methods, and headers are allowed when making
    | requests to your application.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],

    'allowed_methods' => ['*'], // أو حدد الطرق مثل ['GET', 'POST', 'PUT', 'DELETE']

   'allowed_origins' => ['http://localhost:3000'], //, // يمكنك استبدالها بـ ['http://localhost:3000'] لتحديد الأصل

    'allowed_headers' => ['*'], // أو حدد الرؤوس التي تريدها

    'exposed_headers' => [],
    
    'max_age' => 0,

    'supports_credentials' => true,
];




