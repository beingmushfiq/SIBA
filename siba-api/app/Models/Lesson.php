<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'title', 'content', 'video_url',
        'resources', 'duration', 'order', 'module_id',
    ];

    protected function casts(): array
    {
        return [
            'resources' => 'array',
        ];
    }

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

    public function progress()
    {
        return $this->hasMany(LessonProgress::class, 'lesson_id');
    }
}
