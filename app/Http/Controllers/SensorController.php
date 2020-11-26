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
        return response()->json(Sensor::with('alldata')->where('id', $id)->first());
    }
    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "sensor_name" => 'required|string|max:255',
            "zone_id" => 'required|digits_between:1,20|exists:zones,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $sensor = Sensor::where('id', $request->id)->first();
        if ($sensor) {
            $sensor->sensor_name =  $request->sensor_name;
            $sensor->zone_id = $request->zone_id;
            $sensor->save();
            return response()->json(["message" => "success", "sensor" => $sensor], 200);
        } else {
            return response()->json(["message" => "sensor tidak ditemukan"], 404);
        }
        return response()->json($sensor, 201);
    }
    public function delete(Request $request)
    {
        $sensor = Sensor::where('id', $request->id)->first();
        if ($sensor) {
            $sensor->delete();

            return response()->json([
                'message' => 'sensor berhasil dihapus',
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }
}
