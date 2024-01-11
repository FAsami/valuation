import React from 'react'
import Header from './Header'
import tw from 'twin.macro'
import styled from 'styled-components'

const Layout = ({ children }) => {
  return (
    <StyledLayout>
      <Header />
      <div>{children}</div>
    </StyledLayout>
  )
}

export default Layout

const StyledLayout = styled.div`
  ${tw`min-h-screen w-screen h-full`}
  body {
    font-family: 'Noto Sans Bengali', sans-serif;
    font-optical-sizing: auto;
  }
`
