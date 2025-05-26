import { Skeleton } from '@/components/ui/skeleton'

export default function ApplicationsLoading() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-3 bg-gradient-to-b from-foreground from-50% to-neutral-600 bg-clip-text pt-2 text-center text-5xl font-semibold text-transparent dark:to-neutral-400">
        Your Job Applications
      </div>
      <Skeleton style={{ height: '66.6667vh' }} className="w-full" />
    </div>
  )
}
