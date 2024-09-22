<?php

namespace App\Domains\Incident\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Incident extends Model
{
    use HasFactory;

    protected $table = 'incidents';

    protected $fillable = [
        'name',        // Nome do incidente
        'evidence',    // Evidência ou descrição do incidente
        'severity',    // Criticidade do incidente
        'host',        // Host associado ao incidente
    ];

    protected $casts = [
        'name' => 'string',
        'evidence' => 'string',
        'severity' => 'string',
        'host' => 'string',
    ];
}
