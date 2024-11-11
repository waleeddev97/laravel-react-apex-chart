<?php

namespace Database\Seeders;

use App\Models\Log;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = ['job1', 'job2', 'job3'];
        $statuses = ['success', 'fail'];

        foreach (range(1, 200) as $index) {
            Log::create([
                'type' => $types[array_rand($types)],
                'status' => $statuses[array_rand($statuses)],
                'log_datetime' => Carbon::now()->subDays(rand(0, 180))
            ]);
        }
    }
}
