'use client'

import { Button } from '@/components/ui/button'
import { GoogleScopes } from '@/constants/auth'
import { authClient } from '@/lib/auth-client'
import { useState } from 'react'

export default function RequestGmailScopesButton() {
  const [isLoading, setIsLoading] = useState(false)

  const handleRequestScopes = async () => {
    setIsLoading(true)

    await authClient.linkSocial({
      provider: 'google',
      scopes: [GoogleScopes.GMAIL_READONLY],
      fetchOptions: {
        query: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })

    setIsLoading(false)
  }

  const handleRefreshToken = async () => {
    setIsLoading(true)

    const response = await authClient.refreshToken({
      providerId: 'google',
    })

    console.log(response)

    setIsLoading(false)
  }

  return (
    <>
      <Button onClick={handleRequestScopes} disabled={isLoading}>
        Request Gmail Scopes
      </Button>
      <Button onClick={handleRefreshToken}>Refresh Token</Button>
    </>
  )
}
