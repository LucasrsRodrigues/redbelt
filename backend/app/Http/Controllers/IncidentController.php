<?php

namespace App\Http\Controllers;

use App\Domains\Incident\Actions\CreateIncidentAction;
use App\Domains\Incident\Actions\DeleteIncidentAction;
use App\Domains\Incident\Actions\ListIncidentAction;
use App\Domains\Incident\Actions\UpdateIncidentAction;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class IncidentController extends Controller
{
    protected $createIncidentAction;
    protected $listIncidentAction;
    protected $updateIncidentAction;
    protected $deleteIncidentAction;

    public function __construct(
        CreateIncidentAction $createIncidentAction,
        ListIncidentAction $listIncidentAction,
        UpdateIncidentAction $updateIncidentAction,
        DeleteIncidentAction $deleteIncidentAction,
    ) {
        $this->createIncidentAction = $createIncidentAction;
        $this->listIncidentAction = $listIncidentAction;
        $this->updateIncidentAction = $updateIncidentAction;
        $this->deleteIncidentAction = $deleteIncidentAction;
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

    public function update(Request $request, $id)
    {

        $data = $request->all();

        try {
            $incidentExists = $this->show($id);
            $incidentExists = $incidentExists->getData();

            if (count(get_object_vars($incidentExists)) === 0) {
                return response()->json(['message' => "Incidente não encontrado."], 404);
            }

            $newData = (array) $this->updateObject($incidentExists, $data);

            // Gravar novo incidente;
            $incident = $this->updateIncidentAction->execute($id, $newData);

            return response()->json($incident, 200);
        } catch (ModelNotFoundException $e) {
            return response()->json(['message' => $e->getMessage()], 404); // Retorna 404 se o incidente não for encontrado
        } catch (ValidationException $e) {
            return response()->json(['message' => $e->validator->errors()], 422); // Retorna os erros de validação
        }
    }

    public function destroy($id)
    {
        try {
            $this->deleteIncidentAction->execute($id);

            return response()->json(['success' => true]);
        } catch (\Throwable $th) {
            return response()->json(['error' => $th->getMessage()]);
        }
    }

    protected function  updateObject($a, $b): object
    {
        // Iterar sobre todas as propriedades de B
        foreach ($b as $key => $value) {
            // Se o campo não existir no objeto A ou o valor for diferente
            if (!property_exists($a, $key) || $a->$key !== $value) {
                $a->$key = $value; // Sobrescreve A com B ou adiciona campo novo
            }
        }

        return $a; // Retorna o objeto A atualizado
    }
}
