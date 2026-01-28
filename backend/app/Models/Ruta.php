<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Ruta extends Model
{
    use HasFactory;
    
    public function metas()
    {
        return $this->hasMany(Meta::class);
    }
}
