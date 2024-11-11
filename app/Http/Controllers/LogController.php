<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function getLogs($period)
    {
        switch ($period) {
            case 'week':
                $startDate = Carbon::now()->subWeek();
                break;
            case 'month':
                $startDate = Carbon::now()->subMonth();
                break;
            case 'semester':
                $startDate = Carbon::now()->subMonths(6);
                break;
            default:
                return response()->json(['error' => 'Invalid period'], 400);
        }

        $logs = Log::where('log_datetime', '>=', $startDate)
            ->selectRaw('DATE(log_datetime) as date')
            ->selectRaw('SUM(status = "success") as success_count')
            ->selectRaw('SUM(status = "fail") as fail_count')
            ->selectRaw('COUNT(*) as total_count')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($logs);
    }
}
