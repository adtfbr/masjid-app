<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class EventController extends Controller
{
    /**
     * LIST EVENTS
     */
    public function index()
    {
        return response()->json([
            'success' => true,
            'data' => Event::orderBy('start_time', 'desc')->get(),
        ]);
    }

    /**
     * CREATE EVENT
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'lecturer'    => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'start_time'  => 'required|date',
            'end_time'    => 'nullable|date|after_or_equal:start_time',
            'poster'      => 'required|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $posterPath = $request->file('poster')->store('events', 'public');

        $event = Event::create([
            'title'       => $validated['title'],
            'slug'        => $this->generateUniqueSlug($validated['title']),
            'description' => $validated['description'] ?? null,
            'lecturer'    => $validated['lecturer'] ?? null,
            'location'    => $validated['location'] ?? 'Masjid Al-Huda',
            'start_time'  => $validated['start_time'],
            'end_time'    => $validated['end_time'] ?? null,
            'poster'      => $posterPath,
            'is_active'   => 1,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil ditambahkan',
            'data' => $event,
        ], 201);
    }

    /**
     * UPDATE EVENT
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'description' => 'nullable|string',
            'lecturer'    => 'nullable|string|max:255',
            'location'    => 'nullable|string|max:255',
            'start_time'  => 'required|date',
            'end_time'    => 'nullable|date|after_or_equal:start_time',
            'poster'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        // Ganti poster jika ada
        if ($request->hasFile('poster')) {
            if ($event->poster && Storage::disk('public')->exists($event->poster)) {
                Storage::disk('public')->delete($event->poster);
            }

            $event->poster = $request->file('poster')->store('events', 'public');
        }

        // Regenerate slug jika judul berubah
        if ($validated['title'] !== $event->title) {
            $event->slug = $this->generateUniqueSlug($validated['title']);
        }

        $event->update([
            'title'       => $validated['title'],
            'description' => $validated['description'] ?? null,
            'lecturer'    => $validated['lecturer'] ?? null,
            'location'    => $validated['location'] ?? 'Masjid Al-Huda',
            'start_time'  => $validated['start_time'],
            'end_time'    => $validated['end_time'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil diperbarui',
            'data' => $event,
        ]);
    }

    /**
     * TOGGLE AKTIF / NONAKTIF
     */
    public function toggle(Event $event)
{
    $event->update([
        'is_active' => !$event->is_active
    ]);

    return response()->json([
        'message' => 'Status agenda diperbarui',
        'data' => $event
    ]);
}



    /**
     * NONAKTIFKAN (ALIAS DELETE VERSION KITA)
     */
    public function destroy(Event $event)
    {
        $event->update([
            'is_active' => 0,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Kegiatan berhasil dinonaktifkan',
        ]);
    }

    /**
     * SLUG GENERATOR (PASTI UNIK)
     */
    private function generateUniqueSlug(string $title): string
    {
        $slug = Str::slug($title);
        $original = $slug;
        $counter = 1;

        while (Event::where('slug', $slug)->exists()) {
            $slug = $original . '-' . $counter;
            $counter++;
        }

        return $slug;
    }
}
