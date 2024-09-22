<?php

namespace App\Domains\Incident\Actions;

use App\Domains\Incident\Repositories\IncidentRepositoryInterface;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Validator;

class CreateIncidentAction
{
    protected $incidentRepository;
    protected $fileUploadService;

    public function __construct(IncidentRepositoryInterface $incidentRepository, FileUploadService $fileUploadService)
    {
        $this->incidentRepository = $incidentRepository;
        $this->fileUploadService = $fileUploadService;
    }

    public function execute(array $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'evidence' => 'required|image',
            'severity' => 'required|integer|min:1|max:5', // Exemplo de criticidade de 1 a 5
            'host' => 'required|string|max:255',
        ]);


        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid credentials provided.');
        }

        $evidencePath = $this->fileUploadService->upload($data['evidence']);

        $incident = $this->incidentRepository->create([
            'name' => $data['name'],
            'evidence' => $evidencePath,
            'severity' => $data['severity'],
            'host' => $data['host'],
        ]);

        return $incident;
    }
}
