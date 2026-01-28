<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Accionable extends Model
{
    protected $fillable = [
        'texto',
        'meta_id',
        'hecho',
    ];

    public function meta()
    {
        return $this->belongsTo(Meta::class);
    }
}
