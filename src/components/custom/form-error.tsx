import { TriangleAlert } from 'lucide-react'

interface FormErrorProps {
  message?: string
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null
  return (
    <div className="flex items-center justify-center gap-x-2 rounded-md bg-destructive p-2 text-sm text-destructive-foreground">
      <TriangleAlert className="h-4 w-4" />
      <p>{message}</p>
    </div>
  )
}
