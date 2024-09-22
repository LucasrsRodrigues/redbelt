<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadService
{
    public function upload(UploadedFile $file, string $diretory = 'evidences'): string
    {
        $path = Storage::disk('public')->put($diretory, $file);

        if (!$path) {
            throw new \Exception('Falha ao salvar o arquivo');
        }

        return $path;
    }
}
