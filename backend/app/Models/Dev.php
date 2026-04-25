<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Dev extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $appends = ['stack_names'];
    protected $hidden = ['stacks', 'updated_at', 'created_at'];
    protected $fillable = [
        'id',
        'nickname',
        'name',
        'birth_date',
    ];

    public function stacks()
    {
        return $this->hasMany(DevStack::class);
    }

    public function getStackNamesAttribute()
    {
        return $this->stacks->pluck('name');
    }
}
