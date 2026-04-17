<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class BusinessPlan extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'title', 'description', 'stage', 'revenue', 'kpis', 'user_id',
    ];

    protected function casts(): array
    {
        return [
            'revenue' => 'double',
            'kpis' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function entries()
    {
        return $this->hasMany(BusinessEntry::class, 'business_plan_id');
    }
}
