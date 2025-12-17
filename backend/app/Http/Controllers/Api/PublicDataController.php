<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Donation;
use Illuminate\Http\Request;
use Carbon\Carbon;

class PublicDataController extends Controller
{
    public function getHomeData()
    {
        // Logic Data (Sama seperti sebelumnya)
        $events = Event::where('is_active', true)
            ->whereDate('date', '>=', Carbon::today())
            ->orderBy('date', 'asc')
            ->take(3)
            ->get();

        $totalDonation = Donation::where('status', 'verified')->sum('amount');

        $donationThisMonth = Donation::where('status', 'verified')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->sum('amount');

        $recentDonations = Donation::where('status', 'verified')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get(['donor_name', 'amount', 'category', 'created_at']);

        return response()->json([
            'success' => true,
            'data' => [
                'events' => $events,
                'financial' => [
                    'total_balance' => number_format($totalDonation, 0, ',', '.'),
                    'income_month' => number_format($donationThisMonth, 0, ',', '.'),
                    'last_update' => Carbon::now()->translatedFormat('d F Y'),
                ],
                'recent_donations' => $recentDonations->map(function($d) {
                    return [
                        'name' => $d->donor_name,
                        'amount' => number_format($d->amount, 0, ',', '.'),
                        'category' => $d->category,
                        'time' => $d->created_at->diffForHumans(),
                    ];
                })
            ]
        ]);
    }
}
