<?php

namespace App\Models;

use App\Models\Concerns\HasCuid;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasCuid;
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'id', 'title', 'slug', 'description', 'thumbnail',
        'price', 'level', 'published', 'featured',
        'trainer_id', 'category_id',
    ];

    protected function casts(): array
    {
        return [
            'price' => 'double',
            'published' => 'boolean',
            'featured' => 'boolean',
        ];
    }

    public function trainer()
    {
        return $this->belongsTo(User::class, 'trainer_id');
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function modules()
    {
        return $this->hasMany(Module::class, 'course_id')->orderBy('order');
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'course_id');
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class, 'course_id');
    }

    public function discussions()
    {
        return $this->hasMany(Discussion::class, 'course_id');
    }
}
