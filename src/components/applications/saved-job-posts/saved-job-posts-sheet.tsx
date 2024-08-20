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
import NewSavedJobPostButton from "@/components/forms/saved-job-post/new-saved-job-post-button";
import SavedJobPostItem from "@/components/applications/saved-job-posts/saved-job-post-item";

export default function SavedJobPostsSheet() {
  const query = api.savedForLater.getAllSavedForLaterByUserId.useQuery()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Bookmark className="h-5 w-5"/>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Saved Job Posts</SheetTitle>
          <SheetDescription>
            Add job posts here to apply to later
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <div className="flex justify-center">
            <NewSavedJobPostButton>
              <Button>New Job Post</Button>
            </NewSavedJobPostButton>
          </div>
          <div className="py-3">
            {query.isPending ? (
              <div>Loading...</div>
            ) : query.isError ? (
              <div className="flex flex-col items-center justify-center">
                An error has occurred
              </div>
            ) : (
              <>{query.data.length > 0 ? (
                <ul className="space-y-4 pt-4">
                  {
                    query.data.map((savedJobPost) => (
                      <li key={savedJobPost.id}>
                        <SavedJobPostItem jobPost={savedJobPost}/>
                      </li>
                    ))
                  }
                </ul>
              ) : 'No saved for later'}</>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
