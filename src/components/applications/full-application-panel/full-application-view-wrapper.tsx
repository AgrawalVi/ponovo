import FullApplicationViewSkeleton from '@/components/skeletons/full-application-view-skeleton'
import FullApplicationView from './full-application-view'

export default function FullApplicationViewWrapper({
  applicationId,
}: {
  applicationId: string | undefined
}) {
  if (!applicationId) {
    return <FullApplicationViewSkeleton />
  }

  return <FullApplicationView applicationId={applicationId} />
}
