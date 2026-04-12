<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LiveSession extends Model
{
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'title', 'description', 'scheduled_at', 'duration', 'meeting_url', 'status', 'trainer_id'];
    protected function casts(): array { return ['scheduled_at' => 'datetime']; }
    public function trainer() { return $this->belongsTo(User::class, 'trainer_id'); }
}
