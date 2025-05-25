import { authClient } from '@/lib/auth-client'

import { GithubDark, GithubLight } from '../SVGs/github-icon'
import GoogleIcon from '../SVGs/google-icon'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'

export default function ProvidersSection({
  loading,
  setLoading,
  setError,
  callbackUrl,
}: {
  loading: boolean
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  callbackUrl: string
}) {
  const onGoogleSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: callbackUrl,
      })
    } catch (error) {
      console.log('[onGoogleSubmit] Error', error)
      setError('Something went wrong')
    }
    setLoading(false)
  }

  const onGithubSubmit = async () => {
    setLoading(true)
    setError(null)
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: callbackUrl,
      })
    } catch (error) {
      console.log('[onGithubSubmit] Error', error)
      setError('Something went wrong')
    }
    setLoading(false)
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="relative col-span-2 my-2">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-2 text-xs uppercase text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        aria-label="Login with Google"
        onClick={onGoogleSubmit}
        disabled={loading}
      >
        <GoogleIcon />
      </Button>
      <Button
        type="button"
        variant="outline"
        className="w-full"
        aria-label="Login with Github"
        onClick={onGithubSubmit}
        disabled={loading}
      >
        <span className="block dark:hidden">
          <GithubLight />
        </span>
        <span className="hidden dark:block">
          <GithubDark />
        </span>
      </Button>
    </div>
  )
}
