<?php

namespace App\Domains\Incident\Actions;

use App\Domains\Incident\Repositories\IncidentRepositoryInterface;

class DeleteIncidentAction
{
    protected $incidentRepository;

    public function __construct(IncidentRepositoryInterface $incidentRepository)
    {
        $this->incidentRepository = $incidentRepository;
    }

    public function execute($id)
    {
        $this->incidentRepository->delete($id);
    }
}
