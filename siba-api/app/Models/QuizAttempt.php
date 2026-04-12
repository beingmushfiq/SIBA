<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'score', 'answers', 'passed', 'quiz_id', 'user_id'];
    protected function casts(): array { return ['answers' => 'array', 'passed' => 'boolean']; }
    public function quiz() { return $this->belongsTo(Quiz::class, 'quiz_id'); }
}
