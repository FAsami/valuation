import Link from 'next/link'
import tw from 'twin.macro'
import { css } from 'styled-components'
import { useLottie } from 'lottie-react'
import practice from '../public/lottie/practice.json'
import model from '../public/lottie/model-test.json'

const Home = () => {
  const { View: Practice } = useLottie({
    animationData: practice,
    loop: true,
  })
  const { View: Model } = useLottie({
    animationData: model,
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
        {info.map(({ id, title, link, icon }) => {
          return (
            <Link
              key={id}
              href={link}
              tw="h-full w-64 p-4 flex flex-col justify-center items-center shadow-sm rounded-lg md:rounded-2xl gap-4 cursor-pointer text-lg md:text-xl font-medium no-underline"
              css={[
                css`
                  filter: drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2));
                `,
              ]}
            >
              <div tw="h-52 w-auto">{icon}</div>
              <div>
                <div tw="text-xl md:text-2xl text-[#303030]">{title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
