import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function Dashboard() {
    const [period, setPeriod] = useState('week');
    const [chartData, setChartData] = useState({
        series: [],
        options: {
            chart: { id: 'log-chart' },
            xaxis: { categories: [] },
            colors: ['#28a745', '#dc3545', '#007bff'],
            dataLabels: { enabled: true },
        }
    });

    const fetchData = async (selectedPeriod) => {
        try {
            const response = await axios.get(`/api/logs/${selectedPeriod}`);
            const dates = response.data.map(log => log.date);
            const successCounts = response.data.map(log => log.success_count);
            const failCounts = response.data.map(log => log.fail_count);
            const totalCounts = response.data.map(log => log.total_count);

            setChartData({
                series: [
                    { name: 'Success', data: successCounts },
                    { name: 'Fail', data: failCounts },
                    { name: 'Total', data: totalCounts },
                ],
                options: {
                    ...chartData.options,
                    xaxis: { categories: dates },
                },
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData(period);
    }, [period]);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Logs Chart
                </h2>
            }
        >
            <Head title="Logs chart" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <select
                                className="rounded-lg focus:border-0"
                                value={period}
                                onChange={(e) => setPeriod(e.target.value)}
                            >
                                <option value="week">Week</option>
                                <option value="month">Month</option>
                                <option value="semester">Semester</option>
                            </select>
                            <ReactApexChart
                                options={chartData.options}
                                series={chartData.series}
                                type="line"
                                height="300"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


