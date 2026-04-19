<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class ActivityLog extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = ['id', 'action', 'details', 'user_id'];
    public function user() { return $this->belongsTo(User::class, 'user_id'); }
}
