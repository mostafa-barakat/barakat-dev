<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json([
            'data' => Service::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'icon' => 'required',
            'name_en' => 'required',
            'name_ar' => 'required',
            'desc_en' => 'required',
            'desc_ar' => 'required',
        ]);

        return Service::create($request->all());
    }

    public function update(Request $request, $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->all());

        return response()->json($service);
    }

    public function destroy($id)
    {
        Service::findOrFail($id)->delete();

        return response()->json(['message' => 'deleted']);
    }
}
