import { CircleCheck } from 'lucide-react'

export default function FormSuccess({ message }: { message: string }) {
  return (
    <div className="flex items-center justify-center gap-x-2 rounded-md bg-emerald-500/15 p-2 text-sm text-emerald-500">
      <CircleCheck className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
