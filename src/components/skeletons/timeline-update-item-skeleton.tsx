import { Skeleton } from '@/components/ui/skeleton'

export default function TimelineUpdateItemSkeleton() {
  return (
    <li className="space-y-4 py-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-[22px] w-20" />
        <div className="flex justify-center text-base">
          <Skeleton className="h-6 w-48" />
        </div>
      </div>
      <div className="flex w-full justify-end space-x-2">
        <Skeleton className="h-10 w-24" />
      </div>
    </li>
  )
}
