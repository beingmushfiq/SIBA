<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class QuizAttempt extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'score', 'answers', 'passed', 'quiz_id', 'user_id'];
    protected function casts(): array { return ['answers' => 'array', 'passed' => 'boolean']; }
    public function quiz() { return $this->belongsTo(Quiz::class, 'quiz_id'); }
}
