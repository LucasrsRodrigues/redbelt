<?php

namespace App\Domains\Incident\Actions;

use App\Domains\Incident\Repositories\IncidentRepositoryInterface;

class ListIncidentAction
{
    protected $incidentRepository;

    public function __construct(IncidentRepositoryInterface $incidentRepository)
    {
        $this->incidentRepository = $incidentRepository;
    }

    public function execute()
    {

        // if ($id) {
        //     return $this->incidentRepository->findById($id);
        // }


        return $this->incidentRepository->getAll();
    }
}
