<?php

namespace App\Http\Controllers;

use App\Models\SensorDataLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "sensor_id" => 'required|digits_between:1,20|exists:sensors,id',
            "suhu_udara" => 'required|integer',
            "kelembaban_udara" => 'required|integer',
            "suhu_tanah" => 'required|integer',
            "kelembaban_tanah" => 'required|integer',
            "intensitas_cahaya" => 'required|integer',
            "batrai" => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $data = SensorDataLog::create([
            "sensor_id" => $request->get('sensor_id'),
            "suhu_udara" => $request->get('suhu_udara'),
            "kelembaban_udara" => $request->get('kelembaban_udara'),
            "suhu_tanah" => $request->get('suhu_tanah'),
            "kelembaban_tanah" => $request->get('kelembaban_tanah'),
            "intensitas_cahaya" => $request->get('intensitas_cahaya'),
            "batrai" => $request->get('batrai')
        ]);
        return response()->json($data, 201);
    }
    public function getAll()
    {
        return response()->json(SensorDataLog::orderBy('id', 'desc')->get());
    }
    public function getById($id)
    {
        return response()->json(SensorDataLog::where('id', $id)->first());
    }
}
