import Link from 'next/link'
import tw from 'twin.macro'
import styled, { css } from 'styled-components'
import { useLottie } from 'lottie-react'
import practice from '../public/lottie/practice.json'
import model from '../public/lottie/model-test.json'
import { GoArrowRight } from 'react-icons/go'
import Plane from '../public/lottie/plane.json'

const Home = () => {
  const { View: Practice } = useLottie({
    animationData: practice,
    loop: true,
  })
  const { View: Model } = useLottie({
    animationData: model,
    loop: true,
  })

  const { View: AnimatedPlane } = useLottie({
    animationData: Plane,
    loop: true,
  })

  const info = [
    {
      id: 1,
      title: 'মডেল টেস্ট',
      link: '/model-exam',
      icon: Model,
    },
    {
      id: 2,
      title: 'অনুশীলন',
      link: '/practice',
      icon: Practice,
    },
  ]

  return (
    <div tw="flex items-center flex-col justify-center min-h-[calc(100vh - 84px)] h-full">
      <div tw="flex items-center gap-6 h-full flex-col md:flex-row">
        {info.map(({ id, title, link, icon }, i) => {
          const animationClass =
            i % 2 == 0
              ? 'animate__animated animate__bounceIn'
              : 'animate__animated animate__bounceIn'
          return (
            <Link
              key={id}
              href={link}
              tw="h-full w-64 p-4 flex flex-col justify-center items-center shadow-sm rounded-lg md:rounded-2xl gap-4 cursor-pointer text-lg md:text-xl font-medium no-underline bg-white  transition-all z-50 relative hover:bg-gray-100"
            >
              <div tw="h-52 w-auto">{icon}</div>
              <div>
                <div tw="text-xl leading-normal md:text-2xl text-[#303030] font-semibold flex items-center gap-3 mt-4">
                  <span>{title}</span>
                  <GoArrowRight
                    className={animationClass}
                    tw="text-primary mb-0.5"
                  />
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <StyledAnimation>{AnimatedPlane}</StyledAnimation>
    </div>
  )
}

export default Home

const StyledAnimation = styled.div`
  ${tw`fixed top-1//2 right-1/2 opacity-10 -z-10`}
  svg {
    opacity: 0.1;
    z-index: -1;
  }
`
