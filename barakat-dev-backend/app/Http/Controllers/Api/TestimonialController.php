<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Testimonial;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    public function index()
    {
        return Testimonial::latest()->get()->map(function ($t) {
            return [
                'id' => $t->id,
                'author_ar' => $t->author_ar,
                'author_en' => $t->author_en,
                'quote_ar' => $t->quote_ar,
                'quote_en' => $t->quote_en,
                'image' => $t->image ? asset('storage/' . $t->image) : null,
            ];
        });
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'quote_ar' => 'required',
            'quote_en' => 'required',
            'author_ar' => 'required',
            'author_en' => 'required',
            'image' => 'nullable|image',
        ]);


        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('testimonials', 'public');
        }

        $testimonial = Testimonial::create($data);

        $testimonial->image = $testimonial->image
            ? asset('storage/' . $testimonial->image)
            : null;

        return response()->json($testimonial);
    }
    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $data = $request->validate([
            'quote_ar' => 'sometimes',
            'quote_en' => 'sometimes',
            'author_ar' => 'sometimes',
            'author_en' => 'sometimes',
            'image' => 'nullable|image',
        ]);

        // 🟢 إذا تم رفع صورة جديدة
        if ($request->hasFile('image')) {

            // حذف الصورة القديمة (اختياري مهم)
            if ($testimonial->image) {
                $oldPath = str_replace(asset('storage/'), '', $testimonial->image);
                Storage::disk('public')->delete($oldPath);
            }

            $data['image'] = $request->file('image')->store('testimonials', 'public');
        }

        // if ($request->has('tags')) {
        //     $data['tags'] = is_string($request->tags)
        //         ? $request->tags
        //         : json_encode($request->tags);
        // }

        $testimonial->update($data);

        $testimonial->image = $testimonial->image
            ? asset('storage/' . $testimonial->image)
            : null;

        return response()->json($testimonial);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        if ($testimonial->image) {
            $path = str_replace(asset('storage/'), '', $testimonial->image);
            Storage::disk('public')->delete($path);
        }
        $testimonial->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
