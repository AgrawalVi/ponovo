import { dbSavedJobPost } from "@/types";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import Link from "next/link";


const SavedJobPostItem = ({
  jobPost,
} : {
  jobPost: dbSavedJobPost
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitalize">{jobPost.companyName}</CardTitle>
        <div className="flex items-center justify-between">
          <div className="pt-2 text-lg capitalize text-muted-foreground">
            {jobPost.jobTitle}
          </div>
        </div>
        <CardDescription className="flex justify-between">
          <span className="capitalize">{jobPost.roleType}</span>
          <span>{format(new Date(jobPost.addedDate), 'PPP')}</span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="grid grid-cols-3 gap-2">
        <div className="flex justify-start">
        {jobPost.url && (
          <Link href={jobPost.url} target="_blank" rel="noreferrer noopener">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="border border-dashed"
                size="icon"
              >
                <Copy size="20" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Copy Job Post URL</TooltipContent>
          </Tooltip>
          </Link>
        )}
        </div>
        <div className="flex justify-center">
          asdf
        </div>
        <div className="flex justify-end">
          asdf
          {/*<EditApplicationButton application={rest} />*/}
          {/*<DeleteApplicationButton applicationId={applicationId} />*/}
        </div>
      </CardFooter>
    </Card>
  )
}

export default SavedJobPostItem