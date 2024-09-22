<?php

namespace App\Domains\Incident\Repositories;

use App\Domains\Incident\Models\Incident;

class IncidentRepository implements IncidentRepositoryInterface
{
    public function getAll()
    {
        return Incident::all();
    }

    public function findById($id)
    {
        return Incident::find($id);
    }

    public function create(array $data)
    {
        return Incident::create($data);
    }

    public function update($id, array $data)
    {
        $incident = Incident::find($id);
        if ($incident) {
            $incident->update($data);
            return $incident;
        }
        return null;
    }

    public function delete($id)
    {
        $incident = Incident::find($id);

        if ($incident) {
            $incident->delete();
            return true;
        }
        return false;
    }
}
