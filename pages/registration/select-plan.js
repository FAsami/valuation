import React from 'react'
import tw from 'twin.macro'

const SelectPlan = () => {
  return (
    <div tw="container flex items-center justify-center mx-auto min-h-[calc(100vh - 84px)] h-full">
      <div tw="text-gray-100 w-36 md:w-48 h-36 md:h-48 bg-green-900 flex flex-col justify-center items-center shadow-sm rounded-lg md:rounded-2xl gap-4 cursor-pointer text-lg md:text-xl font-medium no-underline ">
        Free forever
      </div>
    </div>
  )
}

export default SelectPlan
