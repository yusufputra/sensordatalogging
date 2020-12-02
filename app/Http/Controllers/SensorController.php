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
    public function getById($id, $tipe)
    {
        $sensors = Sensor::where('id', $id)->first();
        $data = Sensor::with('alldata')->where('id', $id)->first();
        if ($tipe == 'all') {
            return response()->json(['sensor' => $sensors, 'data' => $data->alldata]);
        }
        //normal
        // return response()->json(['sensor' => $sensors, 'data' => $data->alldata]);
        //hourly
        $hourly = [];
        $temp1 = [];
        $temp2 = [];
        $temp3 = [];
        $temp4 = [];
        $temp5 = [];
        $hour = 0;
        $date = null;
        $totaldata = count($data->alldata);
        $iterate = 1;
        foreach ($data->alldata as $item) {
            $iterate++;
            if ($tipe == 'jam') {
                $ih = explode(":", explode(" ", $item->created_at)[1])[0];
            } else if ($tipe == 'hari') {
                $ih = explode("-", explode(" ", $item->created_at)[0])[2];
            } else if ($tipe == 'bulan') {
                $ih = explode("-", explode(" ", $item->created_at)[0])[1];
            } else {
                $ih = explode("-", explode(" ", $item->created_at)[0])[0];
            }

            if ($hour != $ih) {
                if ($temp1 != []) {
                    //ini buat ngitung
                    $rata1 = array_sum($temp1) / count($temp1);
                    $rata2 = array_sum($temp2) / count($temp2);
                    $rata3 = array_sum($temp3) / count($temp3);
                    $rata4 = array_sum($temp4) / count($temp4);
                    $rata5 = array_sum($temp5) / count($temp5);
                    array_push($hourly, ["id" => $item->id, "sensor_id" => $item->sensor_id, "suhu_udara" => $rata1, "kelembaban_udara" => $rata2, "suhu_tanah" => $rata3, "kelembaban_tanah" => $rata4, "intensitas_cahaya" => $rata5, "created_at" => $date, "updated_at" => $date]);
                }
                $hour = $ih;
                $temp1 = [];
                $temp2 = [];
                $temp3 = [];
                $temp4 = [];
                $temp5 = [];
                $date = $item->created_at;
                array_push($temp1, $item->suhu_udara);
                array_push($temp2, $item->kelembaban_udara);
                array_push($temp3, $item->suhu_tanah);
                array_push($temp4, $item->kelembaban_tanah);
                array_push($temp5, $item->intensitas_cahaya);
            } else {
                array_push($temp1, $item->suhu_udara);
                array_push($temp2, $item->kelembaban_udara);
                array_push($temp3, $item->suhu_tanah);
                array_push($temp4, $item->kelembaban_tanah);
                array_push($temp5, $item->intensitas_cahaya);
                if ($iterate == $totaldata) {
                    //ini buat ngitung
                    $rata1 = array_sum($temp1) / count($temp1);
                    $rata2 = array_sum($temp2) / count($temp2);
                    $rata3 = array_sum($temp3) / count($temp3);
                    $rata4 = array_sum($temp4) / count($temp4);
                    $rata5 = array_sum($temp5) / count($temp5);
                    array_push($hourly, ["id" => $item->id, "sensor_id" => $item->sensor_id, "suhu_udara" => $rata1, "kelembaban_udara" => $rata2, "suhu_tanah" => $rata3, "kelembaban_tanah" => $rata4, "intensitas_cahaya" => $rata5, "created_at" => $date, "updated_at" => $date]);
                }
            }
            // array_push($hourly, $item);
        }
        return response()->json(['sensor' => $sensors, 'data' => $hourly]);
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
