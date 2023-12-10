import Link from 'next/link'
import tw from 'twin.macro'
import { SiPytest } from 'react-icons/si'
import { AiFillFileText } from 'react-icons/ai'
import { css } from 'styled-components'

const Home = () => {
  const info = [
    {
      id: 1,
      title: 'মডেল টেস্ট',
      link: '/model-exam',
      icon: <SiPytest tw="text-2xl h-12 w-12 md:w-20 md:h-20" />,
    },
    {
      id: 2,
      title: 'অনুশীলন',
      link: '/practice',
      icon: <AiFillFileText tw="text-2xl h-12 w-12 md:w-20 md:h-20" />,
    },
  ]
  return (
    <div tw="flex items-center flex-col justify-center min-h-[calc(100vh - 84px)] h-full">
      <div tw="flex items-center gap-6">
        {info.map(({ id, title, link, icon }) => {
          return (
            <Link
              key={id}
              href={link}
              tw="text-gray-100 w-36 md:w-48 h-36 md:h-48 bg-primary flex flex-col justify-center items-center shadow-sm rounded-lg md:rounded-2xl gap-4 cursor-pointer text-lg md:text-xl font-medium no-underline "
              css={[
                css`
                  filter: drop-shadow(0px 6px 20px rgba(0, 0, 0, 0.2));
                `,
              ]}
            >
              {icon}
              <div>
                <div>{title}</div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Home
