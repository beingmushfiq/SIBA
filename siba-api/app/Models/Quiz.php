<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'title', 'description', 'questions', 'passing_score', 'time_limit', 'module_id'];
    protected function casts(): array { return ['questions' => 'array']; }
    public function module() { return $this->belongsTo(Module::class, 'module_id'); }
    public function attempts() { return $this->hasMany(QuizAttempt::class, 'quiz_id'); }
}
