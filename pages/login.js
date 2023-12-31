import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import tw from 'twin.macro'
import { useRouter } from 'next/router'

const Login = () => {
  const { status, data } = useSession()
  const { push, query } = useRouter()

  React.useEffect(() => {
    if (status === 'authenticated') {
      if (!data?.user?.class) {
        if (query.callbackUrl) {
          push(`/registration/info?callbackUrl=${query.callbackUrl}`)
        } else {
          push(`/registration/info`)
        }
      } else {
        if (query?.callbackUrl) {
          push(query.callbackUrl)
        } else {
          push('/')
        }
      }
    }
  }, [status, push, query, data])

  return (
    <div tw="flex h-[calc(100vh - 84px)] items-center justify-center">
      <ButtonWrapper onClick={async () => await signIn('google')}>
        <FcGoogle color="#EB3656" />
        <span>Google অ্যাকাউন্ট দিয়ে লগইন করুন</span>
      </ButtonWrapper>
    </div>
  )
}

export default Login

const ButtonWrapper = tw.button`
  bg-white
  text-[#303030]
  font-normal
  py-4 px-8
  rounded-full
  flex
  items-center
  space-x-2
  border-none 
  outline-none
  cursor-pointer
`
