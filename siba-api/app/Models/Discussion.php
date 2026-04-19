<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class Discussion extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'title', 'content', 'course_id', 'user_id'];
    public function course() { return $this->belongsTo(Course::class, 'course_id'); }
    public function user() { return $this->belongsTo(User::class, 'user_id'); }
    public function replies() { return $this->hasMany(Reply::class, 'discussion_id'); }
}
