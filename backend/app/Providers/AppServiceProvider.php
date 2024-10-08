<?php

namespace App\Providers;

use App\Domains\Incident\Repositories\IncidentRepository;
use App\Domains\Incident\Repositories\IncidentRepositoryInterface;
use App\Domains\User\Repositories\UserRepository;
use App\Domains\User\Repositories\UserRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(IncidentRepositoryInterface::class, IncidentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
