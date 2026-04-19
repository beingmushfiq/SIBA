<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class AiUsageLog extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 
        'user_id', 
        'feature', 
        'model', 
        'tokens_used', 
        'prompt_summary'
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if (!$model->id) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
