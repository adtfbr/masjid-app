<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;

class PrayerTimeController extends Controller
{
    public function getDailySchedule()
    {
        // Kita cache hasilnya selama 1 hari agar tidak membebani API Aladhan
        $data = Cache::remember('prayer_times_today', 60 * 24, function () {
            // Koordinat Depok (Sesuai data masjid)
            $lat = -6.4025;
            $long = 106.7942;

            $response = Http::get("http://api.aladhan.com/v1/timings/" . now()->timestamp, [
                'latitude' => $lat,
                'longitude' => $long,
                'method' => 20, // Kemenag RI
            ]);

            return $response->json();
        });

        // Struktur response disesuaikan dengan ekspektasi frontend lama
        // Frontend berharap: res.data.success & res.data.data
        return response()->json([
            'success' => true,
            'data' => $data['data'] ?? null
        ]);
    }
}
