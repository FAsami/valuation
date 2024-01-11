import { withAuth } from 'next-auth/middleware'

const middleware = (handler) => {
  return withAuth({
    callbacks: {
      authorized({ token }) {
        return !!token
      },
    },
  })(handler)
}

export default middleware

export const config = {
  matcher: [
    '/admin/:path*',
    '/model-exam',
    '/practice',
    '/registration/info',
    '/exam/:path*',
  ],
}
