'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

interface ApplicationPirChartData {
  status: string
  count: number
}

export function ApplicationStatusPieChart({
  data,
}: {
  data: ApplicationPirChartData[]
}) {
  const chartConfig = {
    count: {
      label: 'Applications',
    },
    applied: {
      label: 'Applied',
      color: 'hsl(var(--chart-1))',
    },
    interview: {
      label: 'Interview',
      color: 'hsl(var(--chart-2))',
    },
    offer: {
      label: 'Offer',
      color: 'hsl(var(--chart-3))',
    },
    'online-assessment': {
      label: 'Online Assessment',
      color: 'hsl(var(--chart-4))',
    },
  } satisfies ChartConfig

  const totalApplications = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.count, 0)
  }, [])

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-center">
          Application Status Breakdown
        </CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent className="w-8" hideLabel />}
            />
            <Pie
              data={data}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalApplications.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {totalApplications === 1
                            ? 'Application'
                            : 'Applications'}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="text-center leading-none text-muted-foreground">
          Showing the furthest each application has gone in the process
        </div>
      </CardFooter>
    </Card>
  )
}
