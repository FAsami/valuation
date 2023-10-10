import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import tw from 'twin.macro'

const Home = () => {
  const { data, loading, error } = useQuery(users)
  console.log('data', data, loading, error)
  return (
    <div tw="h-screen w-screen flex items-center justify-center">
      <h1 tw="text-center">মূল্যায়ন</h1>
      <div>
        <Link href="/mock-test">Mock test</Link>
        <Link href="/practice">Quick Practice</Link>
      </div>
    </div>
  )
}

export default Home
const users = gql`
  query users($where: users_bool_exp = {}) {
    users {
      name
    }
  }
`
