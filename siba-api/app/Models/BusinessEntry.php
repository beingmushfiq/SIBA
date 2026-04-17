<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class BusinessEntry extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'title', 'notes', 'metrics', 'revenue', 'business_plan_id',
    ];

    protected function casts(): array
    {
        return [
            'revenue' => 'double',
            'metrics' => 'array',
        ];
    }

    public function businessPlan()
    {
        return $this->belongsTo(BusinessPlan::class, 'business_plan_id');
    }
}
