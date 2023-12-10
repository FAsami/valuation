import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ token }) {
      return !!token
    },
  },
})

export const config = {
  matcher: ['/model-exam', '/practice', '/registration/info', '/exam/:path*'],
}
