<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reply extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'content', 'discussion_id', 'user_id'];
    public function discussion() { return $this->belongsTo(Discussion::class, 'discussion_id'); }
    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
