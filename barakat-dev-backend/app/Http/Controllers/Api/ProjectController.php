<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::latest()->get()->map(function ($project) {
            return [
                'id' => $project->id,
                'title_en' => $project->title_en,
                'title_ar' => $project->title_ar,
                'category_en' => $project->category_en,
                'category_ar' => $project->category_ar,
                'link' => $project->link,
                'tags' => $project->tags,
                'problem_en' => $project->problem_en,
                'problem_ar' => $project->problem_ar,
                'solution_en' => $project->solution_en,
                'solution_ar' => $project->solution_ar,
                'result_en' => $project->result_en,
                'result_ar' => $project->result_ar,
                'image' => $project->image ? asset('storage/' . $project->image) : null,
            ];
        });
    }

    public function store(Request $request)
    {
        $request->validate([
            'title_en' => 'required',
            'title_ar' => 'required',
            'category_en' => 'required',
            'image' => 'required|image'
        ]);

        $data = $request->except(['image']); // ✅ مهم جدًا

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        if ($request->has('tags')) {
            $data['tags'] = is_string($request->tags)
                ? json_decode($request->tags, true)
                : $request->tags;
        }

        $project = Project::create($data);

        $project->image = $project->image
            ? asset('storage/' . $project->image)
            : null;

        return response()->json($project);
    }

    public function update(Request $request, $id)
    {
        $project = Project::findOrFail($id);

        $request->validate([
            'title_en' => 'sometimes',
            'title_ar' => 'sometimes',
            'category_en' => 'sometimes',
            'image' => 'nullable|image' // ✅ بدل required
        ]);

        $data = $request->except(['image']); // ✅ مهم جدًا

        if ($request->hasFile('image')) {

            if ($project->image) {
                Storage::disk('public')->delete($project->image); // ✅ fix
            }

            $data['image'] = $request->file('image')->store('projects', 'public');
        }

        if ($request->has('tags')) {
            $data['tags'] = is_string($request->tags)
                ? $request->tags
                : json_encode($request->tags);
        }

        $project->update($data);

        $project->image = $project->image
            ? asset('storage/' . $project->image)
            : null;

        return response()->json($project);
    }

    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        if ($project->image) {
            $path = str_replace(asset('storage/'), '', $project->image);
            Storage::disk('public')->delete($path);
        }
        $project->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
