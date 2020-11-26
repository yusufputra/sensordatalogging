<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Zone extends Model
{
    use HasFactory;
    protected $fillable = [
        'zone_name', 'location', 'author',
    ];
    public function author()
    {
        return $this->belongsTo('App\User', 'author', 'id');
    }
    public function sensor()
    {
        return $this->hasMany('App\Models\Sensor', 'zone_id', 'id');
    }
}
