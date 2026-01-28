<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Meta extends Model
{
    use HasFactory;

    protected $table = 'metas';
    
    protected $fillable = [
        'titulo',
        'user_id',
        'ruta_id',
    ];
    // La meta pertenece a un usuario
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // La meta pertenece a una categoría (Ruta)
    public function ruta()
    {
        return $this->belongsTo(Ruta::class);
    }

    // Una meta tiene varios items accionables
    public function accionables()
    {
        return $this->hasMany(Accionable::class);
    }
}