<?php

namespace App\Http\Controllers;

use App\Domains\Incident\Actions\CreateIncidentAction;
use App\Domains\Incident\Actions\ListIncidentAction;
use App\Domains\Incident\Actions\UpdateIncidentAction;
use Illuminate\Http\Request;

class IncidentController extends Controller
{
    protected $createIncidentAction;
    protected $listIncidentAction;
    protected $updateIncidentAction;

    public function __construct(
        CreateIncidentAction $createIncidentAction,
        ListIncidentAction $listIncidentAction,
        UpdateIncidentAction $updateIncidentAction,
    ) {
        $this->createIncidentAction = $createIncidentAction;
        $this->listIncidentAction = $listIncidentAction;
        $this->updateIncidentAction = $updateIncidentAction;
    }

    public function index()
    {
        try {
            $incidents = $this->listIncidentAction->execute();

            return response()->json($incidents);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    public function store(Request $request)
    {
        $data = $request->all();

        try {
            $incident = $this->createIncidentAction->execute($data);
            return response()->json($incident, 201);
        } catch (\InvalidArgumentException $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function show($id)
    {
        try {
            $incidents = $this->listIncidentAction->execute($id);

            return response()->json($incidents);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    public function update()
    {
        return response()->json(['success' => true]);
    }

    public function destroy()
    {
        return response()->json(['success' => true]);
    }
}
