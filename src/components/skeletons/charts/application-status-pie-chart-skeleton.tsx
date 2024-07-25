import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function ApplicationStatusPieChartSkeleton({
  placeholderText = '',
}: {
  placeholderText?: string
}) {
  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Application Status Breakdown</CardTitle>
        <CardDescription>All Time</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="mx-auto flex aspect-square h-full max-h-[200px] flex-col justify-center p-4 text-center sm:max-h-[250px]">
          {placeholderText}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing the furthest each application has gone
        </div>
      </CardFooter>
    </Card>
  )
}
