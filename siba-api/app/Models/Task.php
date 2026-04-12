<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'title', 'instructions', 'rubric', 'due_date', 'type', 'max_score', 'module_id'];
    protected function casts(): array { return ['rubric' => 'array', 'due_date' => 'datetime']; }
    public function module() { return $this->belongsTo(Module::class, 'module_id'); }
    public function submissions() { return $this->hasMany(Submission::class, 'task_id'); }
}
