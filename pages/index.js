import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import tw from 'twin.macro'
import { SiPytest } from 'react-icons/si'
import { AiFillFileText } from 'react-icons/ai'
import { css } from 'styled-components'
import { isClient } from '@/utils'
import { useSession } from 'next-auth/react'

const Home = () => {
  return (
    <div tw="flex items-center flex-col justify-center min-h-[calc(100vh - 84px)] h-full">
      <h1 tw="text-center !text-4xl font-semibold mb-8">মূল্যায়ন</h1>
      <div tw="flex items-center gap-6">
        <Link
          href="/online-exam"
          tw="shadow-md w-60 h-60 bg-[#0F0F0F] flex flex-col justify-center items-center  rounded-lg gap-4 cursor-pointer text-xl font-semibold no-underline text-white"
          css={[
            css`
              background: #cc2b5e;
              background: -webkit-linear-gradient(to right, #753a88, #cc2b5e);
              background: linear-gradient(to right, #753a88, #cc2b5e);
            `,
          ]}
        >
          <SiPytest size={96} tw="text-white" />
          <div>
            <div>মক টেস্ট</div>
          </div>
        </Link>
        <Link
          href="/practice"
          tw="shadow-md w-60 h-60 bg-[#0F0F0F] flex flex-col justify-center items-center  rounded-lg gap-4 cursor-pointer text-xl font-semibold no-underline text-white"
          css={[
            css`
              background: #cc2b5e; /* fallback for old browsers */
              background: -webkit-linear-gradient(
                to right,
                #753a88,
                #cc2b5e
              ); /* Chrome 10-25, Safari 5.1-6 */
              background: linear-gradient(
                to right,
                #753a88,
                #cc2b5e
              ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            `,
          ]}
        >
          <AiFillFileText size={96} tw="text-white" />
          <div>
            <div>অনুশীলন</div>
          </div>
        </Link>
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
