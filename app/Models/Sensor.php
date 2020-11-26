<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sensor extends Model
{
    use HasFactory;
    protected $fillable = [
        'sensor_name', 'zone_id', 'author',
    ];

    public function data()
    {
        return $this->hasMany('App\Models\SensorDataLog', 'sensor_id', 'id')->orderBy('id', 'desc')->take(1);
    }
    public function alldata()
    {
        return $this->hasMany('App\Models\SensorDataLog', 'sensor_id', 'id')->orderBy('id', 'desc');
    }
    public function zone()
    {
        return $this->belongsTo('App\Models\Zone', 'zone_id', 'id');
    }
    public function author()
    {
        return $this->belongsTo('App\User', 'author', 'id');
    }
}
