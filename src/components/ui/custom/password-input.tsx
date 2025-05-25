'use client'

import { useState } from 'react'
import { EyeIcon } from 'lucide-react'

import { Button } from '../button'
import { Input } from '../input'

export default function PasswordInput({
  ...props
}: React.ComponentProps<typeof Input>) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input type={showPassword ? 'text' : 'password'} {...props} />
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="absolute right-1 top-1/2 size-7 -translate-y-1/2"
        onClick={() => setShowPassword(!showPassword)}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
      >
        <EyeIcon />
      </Button>
    </div>
  )
}
