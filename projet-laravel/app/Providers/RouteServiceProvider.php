<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * المسار الذي يتم استخدامه للـ home في التطبيق
     *
     * @var string
     */
    public const HOME = '/home';

    /**
     * قم بتحديد المدى الذي سيتم فيه تحميل الـ routes الخاصة بالتطبيق.
     *
     * @return void
     */
    public function map()
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
        $this->mapConsoleRoutes();
    }

    /**
     * تحميل جميع الـ routes الخاصة بالـ web.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->group(base_path('routes/web.php'));
    }

    /**
     * تحميل جميع الـ routes الخاصة بالـ API.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->group(base_path('routes/api.php'));
    }

    /**
     * تحميل جميع الـ routes الخاصة بالـ console commands.
     *
     * @return void
     */
    protected function mapConsoleRoutes()
    {
        // لا حاجة لـ namespace في Laravel 8+
        Route::group([
            'namespace' => $this->namespace
        ], base_path('routes/console.php'));
    }
}
