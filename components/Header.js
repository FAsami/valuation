import tw from 'twin.macro'
import { AiOutlineGoogle, AiOutlineLogout } from 'react-icons/ai'
import { MdLightMode } from 'react-icons/md'
import styled from 'styled-components'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'

const Header = () => {
  const { status } = useSession()

  const handleLogin = async () => {
    await signIn('google')
  }
  const handleLogOut = async () => {
    await signOut()
  }
  return (
    <header tw="bg-[#0F0F0F] shadow shadow-gray-800 py-2 sticky top-0">
      <div tw="container mx-auto py-4 flex justify-between items-center px-4">
        <Link
          href="/"
          tw="text-2xl tracking-wide font-semibold text-white no-underline"
        >
          <span tw="text-[#EB3656] font-extrabold text-3xl">মূ </span>ল্যা য় ন
        </Link>
        <div tw="flex items-center uppercase">
          {status === 'authenticated' ? (
            <StyledButton
              onClick={handleLogOut}
              tw="text-white no-underline text-sm"
            >
              <AiOutlineLogout color="#EB3656" />
              <div>লগ আউট</div>
            </StyledButton>
          ) : (
            <StyledButton
              onClick={handleLogin}
              tw="text-white no-underline text-sm"
            >
              <AiOutlineGoogle color="#EB3656" />
              <div>লগ ইন</div>
            </StyledButton>
          )}
          <StyledButton>
            <MdLightMode />
          </StyledButton>
        </div>
      </div>
    </header>
  )
}

export default Header

const StyledButton = styled.div`
  ${tw`text-sm tracking-wider flex items-center gap-2 px-4 py-2 cursor-pointer`}
`
