<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MentorAssignment extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'mentor_id', 'student_id', 'course_id'];
    public function mentor() { return $this->belongsTo(User::class, 'mentor_id'); }
    public function student() { return $this->belongsTo(User::class, 'student_id'); }
}
