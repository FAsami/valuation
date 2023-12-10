import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import { GraphQLClient } from 'graphql-request'

const client = async () => {
  try {
    return new GraphQLClient(`${process.env.NEXT_PUBLIC_HASURA_GRAPHQL_API}`, {
      headers: {
        'x-hasura-admin-secret': `${process.env.HASURA_GRAPHQL_ADMIN_SECRET}`,
      },
    })
  } catch (error) {
    console.error('error', error)
  }
}

export const authOptions = {
  providers: [
    Google({
      clientId: `${process.env.GOOGLE_CLIENT_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
      httpOptions: {
        timeout: 20000,
      },
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],

  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: false,
        sameSite: 'lax',
        path: '/',
        secure:
          !process.env.NEXT_PUBLIC_MODE ||
          process.env.NEXT_PUBLIC_MODE === 'production',
      },
    },
  },
  pages: { signIn: '/login' },
  callbacks: {
    async signIn({ profile }) {
      try {
        const _client = await client()
        const { users } = await _client.request(GET_USERS, {
          email: profile.email,
        })
        if (!users.length) {
          await _client.request(INSERT_USER, {
            object: {
              email: profile.email,
              name: profile.name,
              avatar: profile.picture,
            },
          })
        }
      } catch (error) {
        console.log('===>', error)
        console.log('Error:', error)
        return false
      }
      return true
    },
    async session({ session, token }) {
      session.user.userId = token.userId
      session.user.class = token.class
      return session
    },
    async jwt({ token, profile }) {
      if (profile) {
        const _client = await client()
        const { users } = await _client.request(GET_USERS, {
          email: profile.email,
        })
        token.userId = users[0].id
        token.class = users[0].class
      }
      return token
    },
  },
}

export default NextAuth(authOptions)

const GET_USERS = `
  query users($email: String!) {
    users(where: {email: {_eq: $email}}) {
      email
      id
      phoneNo
      class
    }
  }
`

const INSERT_USER = `
  mutation users($object: users_insert_input!) {
    insert_users_one(object: $object) {
      id
    }
  }
`
