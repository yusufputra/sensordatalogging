<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SensorController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "sensor_name" => 'required|string|max:255',
            "zone_id" => 'required|digits_between:1,20|exists:zones,id',
            "author" => 'required|digits_between:1,20|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $zone = Sensor::create([
            'sensor_name' => $request->get('sensor_name'),
            'zone_id' => $request->get('zone_id'),
            'author' => $request->get('author')
        ]);
        return response()->json($zone, 201);
    }
    public function getAll()
    {
        // return response()->json(Sensor::All());
        return response()->json(Sensor::with('data')->get());
    }
    public function getById($id)
    {
        return response()->json(Sensor::where('id', $id)->first());
    }
}
