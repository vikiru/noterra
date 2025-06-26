'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    type ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const chartData = [
    { date: '2024-06-01', notes: 2, flashcards: 3 },
    { date: '2024-06-02', notes: 4, flashcards: 2 },
    { date: '2024-06-03', notes: 1, flashcards: 4 },
    { date: '2024-06-04', notes: 5, flashcards: 3 },
    { date: '2024-06-05', notes: 3, flashcards: 4 },
    { date: '2024-06-06', notes: 2, flashcards: 2 },
    { date: '2024-06-07', notes: 6, flashcards: 3 },
    { date: '2024-06-08', notes: 3, flashcards: 5 },
    { date: '2024-06-09', notes: 5, flashcards: 4 },
    { date: '2024-06-10', notes: 2, flashcards: 6 },
    { date: '2024-06-11', notes: 1, flashcards: 3 },
    { date: '2024-06-12', notes: 4, flashcards: 5 },
    { date: '2024-06-13', notes: 3, flashcards: 4 },
    { date: '2024-06-14', notes: 5, flashcards: 2 },
    { date: '2024-06-15', notes: 6, flashcards: 3 },
    { date: '2024-06-16', notes: 4, flashcards: 4 },
    { date: '2024-06-17', notes: 3, flashcards: 5 },
    { date: '2024-06-18', notes: 2, flashcards: 2 },
    { date: '2024-06-19', notes: 4, flashcards: 3 },
    { date: '2024-06-20', notes: 1, flashcards: 4 },
    { date: '2024-06-21', notes: 2, flashcards: 3 },
    { date: '2024-06-22', notes: 5, flashcards: 2 },
    { date: '2024-06-23', notes: 6, flashcards: 4 },
    { date: '2024-06-24', notes: 3, flashcards: 5 },
    { date: '2024-06-25', notes: 2, flashcards: 3 },
    { date: '2024-06-26', notes: 1, flashcards: 4 },
    { date: '2024-06-27', notes: 3, flashcards: 2 },
    { date: '2024-06-28', notes: 4, flashcards: 5 },
    { date: '2024-06-29', notes: 5, flashcards: 3 },
    { date: '2024-06-30', notes: 2, flashcards: 4 },
];

const chartConfig = {
    notes: {
        label: 'Notes',
        color: 'hsl(var(--chart-1))',
    },
    flashcards: {
        label: 'Flashcards',
        color: 'hsl(var(--chart-2))',
    },
} satisfies ChartConfig;

// TODO: refactor this shadcnui component

export function ExampleChart() {
    const [timeRange, setTimeRange] = React.useState('90d');

    const filteredData = chartData.filter((item) => {
        const date = new Date(item.date);
        const referenceDate = new Date('2024-06-30');
        let daysToSubtract = 90;
        if (timeRange === '30d') {
            daysToSubtract = 30;
        } else if (timeRange === '7d') {
            daysToSubtract = 7;
        }
        const startDate = new Date(referenceDate);
        startDate.setDate(startDate.getDate() - daysToSubtract);
        return date >= startDate;
    });

    return (
        <Card className="dark:bg-gray-100">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1 text-center sm:text-left">
                    <CardTitle className="text-3xl dark:text-zinc-900">
                        Activity Overview
                    </CardTitle>
                    <CardDescription>
                        Notes and flashcards created.
                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="w-[160px] rounded-lg sm:ml-auto"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient
                                id="fillDesktop"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-primary)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-primary)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient
                                id="fillMobile"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="var(--color-mobile)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--secondary)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const date = new Date(value);
                                return date.toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                });
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        return new Date(
                                            value,
                                        ).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric',
                                        });
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="notes"
                            type="natural"
                            fill="url(#fillMobile)"
                            stroke="var(--primary)"
                            stackId="a"
                        />
                        <Area
                            dataKey="flashcards"
                            type="natural"
                            fill="url(#fillDesktop)"
                            stroke="var(--secondary)"
                            stackId="a"
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent className="dark:[&>svg]:text-black" />
                            }
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
