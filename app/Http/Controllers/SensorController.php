<?php

namespace App\Http\Controllers;

use App\Models\Sensor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class SensorController extends Controller
{
    public function create(Request $request)
    {
        $payload = Auth::user();
        $validator = Validator::make($request->all(), [
            "sensor_name" => 'required|string|max:255',
            "zone_id" => 'required|digits_between:1,20|exists:zones,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $zone = Sensor::create([
            'sensor_name' => $request->get('sensor_name'),
            'zone_id' => $request->get('zone_id'),
            'author' => $payload->id
        ]);
        return response()->json($zone, 201);
    }
    public function getAll()
    {
        // return response()->json(Sensor::All());
        return response()->json(Sensor::with('data', 'zone')->get());
    }
    public function getById($id)
    {
        return response()->json(Sensor::where('id', $id)->first());
    }
}
