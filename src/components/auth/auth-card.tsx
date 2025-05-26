import Link from 'next/link'

import { Button } from '../ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card'

interface AuthCardProps {
  children: React.ReactNode
  title: string
  description?: string
  backUrl?: {
    label: string
    href: string
  }
  className?: string
}

export default function AuthCard({
  children,
  title,
  description,
  backUrl,
  className,
}: AuthCardProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-start">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        {backUrl && (
          <div className="flex justify-center pt-2">
            <Link href={backUrl.href}>
              <Button variant="link">{backUrl.label}</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
