'use client'

import { Skeleton } from '@/components/ui/skeleton'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import TimelineUpdateItemSkeleton from './timeline-update-item-skeleton'

export default function FullApplicationViewSkeleton() {
  return (
    <Card className="relative h-fit w-[25rem]">
      <CardHeader>
        <Skeleton className="h-8 w-40" />
        <div className="flex items-center justify-between">
          <div className="pt-2 text-lg text-muted-foreground">
            <Skeleton className="h-7 w-36" />
          </div>
        </div>
        <div className="flex justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-5 w-28" />
        </div>
      </CardHeader>
      <CardContent>
        <Separator orientation="horizontal" />
        {[1, 2].length > 0 && (
          <ul className="divide-y">
            {[1, 2].map((index) => (
              <TimelineUpdateItemSkeleton key={index} />
            ))}
          </ul>
        )}
        <Separator orientation="horizontal" />
      </CardContent>
    </Card>
  )
}
