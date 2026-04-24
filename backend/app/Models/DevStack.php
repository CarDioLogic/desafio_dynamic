<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DevStack extends Model
{
    protected $fillable = [
        'name',
        'dev_id',
    ];

    public function dev()
    {
        return $this->belongsTo(Dev::class);
    }
}
