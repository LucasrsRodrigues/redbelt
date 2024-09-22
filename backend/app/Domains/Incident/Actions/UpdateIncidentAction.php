<?php

namespace App\Domains\Incident\Actions;

use App\Domains\Incident\Repositories\IncidentRepository;
use Illuminate\Support\Facades\Validator;

class UpdateIncidentAction
{
    protected $incidentRepository;

    public function __construct(IncidentRepository $incidentRepository)
    {
        $this->incidentRepository = $incidentRepository;
    }

    public function execute(int $id, array $data)
    {
        $validator =  Validator::make($data, [
            'name' => 'required|string|max:255',
            'evidence' => 'nullable|string',
            'severity' => 'required|integer|min:1|max:5', // Exemplo de criticidade de 1 a 5
            'host' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid credentials provided.');
        }

        $incident = $this->incidentRepository->update($id, $data);

        return $incident;
    }
}
