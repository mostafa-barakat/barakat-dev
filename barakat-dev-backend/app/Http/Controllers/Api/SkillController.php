<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Skill;

class SkillController extends Controller
{

    public function index()
    {
        return response()->json([
            'data' => Skill::latest()->select('id', 'name', 'icon')->get()
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:skills,name',
            'icon' => 'required|url',
        ], [
            'name.unique' => 'هذه المهارة موجودة مسبقًا ❌',
        ]);

        $skill = Skill::create($validated);

        return response()->json([
            'message' => 'Skill created successfully',
            'skill' => $skill
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255|unique:skills,name,' . $id,
            'icon' => 'required|url',
        ], [
            'name.unique' => 'هذه المهارة موجودة مسبقًا ❌',
        ]);

        $skill = Skill::findOrFail($id);
        $skill->update($request->all());

        return response()->json([
            'message' => 'Skill updated successfully',
            'skill' => $skill
        ]);
    }

    public function destroy($id)
    {
        Skill::findOrFail($id)->delete();

        return response()->json([
            'message' => 'Skill deleted successfully'
        ]);
    }
}
