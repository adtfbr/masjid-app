<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class PrayerTimeController extends Controller
{
    public function getDailySchedule(Request $request)
    {
        // --- UPDATE LOKASI KE DEPOK ---
        $city = 'Kota Depok';
        $latitude = -6.4025;   // Koordinat Pusat Kota Depok
        $longitude = 106.7942; // Koordinat Pusat Kota Depok

        // 2. Tentukan Tanggal Hari Ini
        $today = Carbon::now();

        // Update key cache agar data lama (Jakarta) terganti
        $cacheKey = "prayer_times_v2_{$today->format('Y-m-d')}_{$city}";

        // 3. Cek Cache
        $schedule = Cache::remember($cacheKey, 60 * 60 * 24, function () use ($today, $latitude, $longitude) {

            // Panggil API Aladhan (Metode Kemenag RI = method 20)
            $response = Http::get('http://api.aladhan.com/v1/timings/' . $today->timestamp, [
                'latitude' => $latitude,
                'longitude' => $longitude,
                'method' => 20, // 20 = Kemenag RI
                'tune' => '0,0,2,0,2,0,0,0,0' // Penyesuaian menit ikhtiyat
            ]);

            if ($response->successful()) {
                return $response->json()['data'];
            }

            return null;
        });

        if (!$schedule) {
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil jadwal sholat'
            ], 500);
        }

        // 4. Format Data untuk Frontend
        return response()->json([
            'success' => true,
            'data' => [
                'city' => $city,
                'date' => $schedule['date']['readable'],
                'hijri' => $schedule['date']['hijri']['date'] . ' ' . $schedule['date']['hijri']['month']['en'] . ' ' . $schedule['date']['hijri']['year'],
                'timings' => [
                    'Subuh' => $schedule['timings']['Fajr'],
                    'Terbit' => $schedule['timings']['Sunrise'],
                    'Dzuhur' => $schedule['timings']['Dhuhr'],
                    'Ashar' => $schedule['timings']['Asr'],
                    'Maghrib' => $schedule['timings']['Maghrib'],
                    'Isya' => $schedule['timings']['Isha'],
                ]
            ]
        ]);
    }
}
