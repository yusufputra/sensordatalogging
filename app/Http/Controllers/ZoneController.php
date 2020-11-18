<?php

namespace App\Http\Controllers;

use App\Models\Zone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ZoneController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "zone_name" => 'required|string|max:255',
            "author" => 'required|digits_between:1,20|exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors()->toJson(), 400);
        }

        $zone = Zone::create([
            'zone_name' => $request->get('zone_name'),
            'author' => $request->get('author')
        ]);
        return response()->json($zone, 201);
    }
    public function getAll()
    {
        return response()->json(Zone::All());
    }
    public function getById($id)
    {
        return response()->json(Zone::where('id', $id)->first());
    }
}
