<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'title', 'description', 'order', 'type', 'course_id'];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function lessons()
    {
        return $this->hasMany(Lesson::class, 'module_id')->orderBy('order');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'module_id');
    }

    public function tasks()
    {
        return $this->hasMany(Task::class, 'module_id');
    }
}
