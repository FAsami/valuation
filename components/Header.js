import tw from 'twin.macro'
import { AiOutlineGoogle, AiOutlineLogout } from 'react-icons/ai'
import { MdLightMode } from 'react-icons/md'
import styled from 'styled-components'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Modal } from 'antd'
import { useRouter } from 'next/router'

const Header = () => {
  const { status } = useSession()
  const router = useRouter()

  const waningModal = (cb) => {
    if (localStorage.getItem('timer')) {
      Modal.confirm({
        title: 'Warning',
        content: 'Are you sure ? ',
        async onOk() {
          localStorage.removeItem('timer')
          cb()
        },
        okText: 'Confirm',
        cancelText: 'Cancel',
        maskClosable: true,
      })
    } else {
      cb()
    }
  }

  const handleLogin = async () => {
    await signIn('google')
  }
  const handleLogOut = async () => {
    waningModal(async () => await signOut())
  }
  return (
    <header tw="shadow sticky top-0 font-sans bg-white">
      <div tw="container mx-auto py-4 flex justify-between items-center px-4">
        <button
          onClick={() => {
            waningModal(() => router.push('/'))
          }}
          tw="text-3xl cursor-pointer tracking-wide font-light  no-underline  bg-transparent border-none outline-none"
        >
          <span tw="text-primary">মূ</span>ল্যা
          <span tw="text-primary">য়</span>ন
        </button>
        <div tw="flex items-center uppercase font-sans">
          {status === 'authenticated' ? (
            <StyledButton
              onClick={handleLogOut}
              tw="font-sans no-underline text-sm"
            >
              <AiOutlineLogout color="#EB3656" />
              <div>লগ আউট</div>
            </StyledButton>
          ) : (
            <StyledButton onClick={handleLogin} tw=" no-underline text-sm">
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
