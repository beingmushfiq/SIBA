<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class LessonProgress extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $table = 'lesson_progress';

    protected $fillable = [
        'id', 'completed', 'time_spent', 'completed_at', 'user_id', 'lesson_id',
    ];

    protected function casts(): array
    {
        return [
            'completed' => 'boolean',
            'completed_at' => 'datetime',
        ];
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class, 'lesson_id');
    }
}
