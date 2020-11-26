<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Auth;

class ZoneController extends Controller
{
    public function create(Request $request)
    {

        $payload = Auth::user();
        $validator = Validator::make($request->all(), [
            "zone_name" => 'required|string|max:255',
            "location" => 'required|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $zone = Zone::create([
            'zone_name' => $request->get('zone_name'),
            'location' => $request->get('location'),
            'author' => $payload->id
        ]);
        return response()->json($zone, 201);
    }
    public function getAll()
    {
        return response()->json(Zone::with('author', 'sensor.author')->get());
    }
    public function getById($id)
    {
        return response()->json(Zone::where('id', $id)->first());
    }
    public function edit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "zone_name" => 'required|string|max:255',
            "location" => 'required|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }
        $zona = Zone::where('id', $request->id)->first();
        if ($zona) {
            $zona->zone_name =  $request->zone_name;
            $zona->location = $request->location;
            $zona->save();
            return response()->json(["message" => "success", "sensor" => $zona], 200);
        } else {
            return response()->json(["message" => "sensor tidak ditemukan"], 404);
        }
        return response()->json($zona, 201);
    }
    public function delete(Request $request)
    {
        $zona = Zone::where('id', $request->id)->first();
        if ($zona) {
            $zona->delete();

            return response()->json([
                'message' => 'zona berhasil dihapus',
            ]);
        } else {
            return response()->json([
                'message' => 'Data tidak ditemukan',
            ], 404);
        }
    }
}
