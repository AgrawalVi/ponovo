import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ApplicationStatusPieChartSkeleton() {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Application Status Breakdown</CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[250px] p-4"></div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the furthest each application has gone
        </div>
      </CardFooter>
    </Card>
  )
}
