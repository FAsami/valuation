import Image from 'next/image'
import React from 'react'
import tw from 'twin.macro'

const Loader = () => {
  return (
    <div tw="h-[60vh] container mx-auto flex items-center justify-center">
      <div tw="h-24 w-auto flex items-center justify-center">
        <img
          src="/mullayan-loader.gif"
          alt="Loading"
          tw="h-full w-auto translate-x-[-50%]"
        />
      </div>
    </div>
  )
}

export default Loader
