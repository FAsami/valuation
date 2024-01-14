import React from 'react'
import Header from './Header'
import tw from 'twin.macro'
import styled from 'styled-components'

import Image from 'next/image'

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <div>{children}</div>
      <Image
        src="/texture/dotted-square.png"
        height={300}
        width={300}
        tw="absolute bottom-0 left-0 -z-10"
        alt=""
      />
      <Image
        src="/texture/dotted-square.png"
        height={300}
        width={300}
        tw="absolute top-0 right-0 -z-10"
        alt=""
      />
    </StyledLayout>
  )
}

export default Layout

const StyledLayout = styled.div`
  ${tw`min-h-screen w-screen h-full font-sans relative`}
  font-optical-sizing: auto;
`
