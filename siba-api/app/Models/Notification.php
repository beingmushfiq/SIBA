<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notification extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'type', 'title', 'message', 'read', 'user_id'];
    protected function casts(): array { return ['read' => 'boolean']; }
    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
