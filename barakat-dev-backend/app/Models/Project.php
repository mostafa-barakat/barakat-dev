<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'title_en', 'title_ar',
        'category_en', 'category_ar',
        'image', 'link',
        'tags',
        'problem_en', 'problem_ar',
        'solution_en', 'solution_ar',
        'result_en', 'result_ar',
    ];

    protected $casts = [
        'tags' => 'array'
    ];
}
