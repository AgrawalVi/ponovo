export const DEFAULT_LOGIN_REDIRECT_URL = '/dashboard'
export const PROTECTED_ROUTES = ['/dashboard']
export const AUTH_ROUTE_PREFIX = '/auth'

export const LOGIN_ROUTE = '/auth/sign-in'
export const SIGNUP_ROUTE = '/auth/sign-up'

export const FORGOT_PASSWORD_ROUTE = '/auth/forgot-password'
export const RESET_PASSWORD_ROUTE = '/auth/reset-password'

export enum GoogleScopes {
  GMAIL_READONLY = 'https://www.googleapis.com/auth/gmail.readonly',
}