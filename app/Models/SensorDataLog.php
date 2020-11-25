<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SensorDataLog extends Model
{
    use HasFactory;
    protected $fillable = [
        'sensor_id', 'suhu_udara', 'kelembaban_udara', 'suhu_tanah', 'kelembaban_tanah', 'intensitas_cahaya'
    ];

    public function sensor(){
        return $this->belongsTo('sensors');
    }
}
