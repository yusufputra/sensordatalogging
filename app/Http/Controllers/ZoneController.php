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
        return response()->json(Zone::with('author', 'sensor')->get());
    }
    public function getById($id)
    {
        return response()->json(Zone::where('id', $id)->first());
    }
}
