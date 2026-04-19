<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = ['id', 'name', 'icon', 'color'];

    public function courses()
    {
        return $this->hasMany(Course::class, 'category_id');
    }
}
