<?php

namespace App\Models\Concerns;

use Illuminate\Support\Str;

/**
 * Auto-generates CUID-like string IDs for models,
 * matching the Prisma cuid() format used in the original schema.
 */
trait HasCuid
{
    protected static function bootHasCuid(): void
    {
        static::creating(function ($model) {
            if (empty($model->{$model->getKeyName()})) {
                $model->{$model->getKeyName()} = static::generateCuid();
            }
        });
    }

    public static function generateCuid(): string
    {
        // Generates a 25-char string similar to Prisma's cuid()
        return 'c' . Str::lower(Str::random(24));
    }
}
