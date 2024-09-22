<?php

namespace App\Domains\Incident\Actions;

use App\Domains\Incident\Repositories\IncidentRepository;
use App\Services\FileUploadService;
use Illuminate\Support\Facades\Validator;

class UpdateIncidentAction
{
    protected $incidentRepository;
    protected $fileUploadService;

    public function __construct(IncidentRepository $incidentRepository, FileUploadService $fileUploadService)
    {
        $this->incidentRepository = $incidentRepository;
        $this->fileUploadService = $fileUploadService;
    }

    public function execute(int $id, array $data)
    {

        $validator = Validator::make($data, [
            'name' => 'nullable|string|max:255',
            'severity' => 'nullable|integer|min:1|max:5', // Exemplo de criticidade de 1 a 5
            'host' => 'nullable|string|max:255',
        ]);


        if ($validator->fails()) {
            throw new \InvalidArgumentException('Invalid credentials provided.');
        }

        $validatorEvidence = Validator::make($data, [
            'evidence' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $evidencePath = null;

        if ($validatorEvidence->passes()) {
            $evidencePath = $this->fileUploadService->upload($data['evidence']);
        }


        $incident = $this->incidentRepository->update($id, [
            'name' => $data['name'],
            'evidence' => $evidencePath ? $evidencePath : $data['evidence'],
            'severity' => $data['severity'],
            'host' => $data['host'],
        ]);

        return $incident;
    }
}
