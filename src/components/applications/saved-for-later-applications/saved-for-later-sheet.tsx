'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Bookmark } from 'lucide-react'
import { api } from '@/trpc/react'

export default function SavedForLaterSheet() {
  const query = api.savedForLater.getAllSavedForLaterByUserId.useQuery()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bookmark className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Saved for Later</SheetTitle>
          <SheetDescription>
            Add job applications here to finish them later
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex justify-center">
            <Button>Add Application</Button>
          </div>
          <div className="py-3">
            {query.isPending ? (
              <div>Loading...</div>
            ) : query.isError ? (
              <div className="flex flex-col items-center justify-center">
                An error has occurred
              </div>
            ) : (
              <>{query.data.length > 0 ? query.data : 'No saved for later'}</>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
