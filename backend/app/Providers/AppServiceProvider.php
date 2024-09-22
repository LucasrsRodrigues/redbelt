<?php

namespace App\Providers;

use App\Domains\Incident\Repositories\IncidentRepository;
use App\Domains\Incident\Repositories\IncidentRepositoryInterface;
use App\Domains\User\Repositories\UserRepository;
use App\Domains\User\Repositories\UserRepositoryInterface;
use App\Services\FileUploadService;
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

        $this->app->singleton(FileUploadService::class, function ($app) {
            return new FileUploadService();
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
