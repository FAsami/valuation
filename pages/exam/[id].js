import { isClient } from '@/utils'
import { b } from '@/utils/useBanglaNumber'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import tw from 'twin.macro'

const Exam = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const groupBySubject = [
    {
      id: 1,
      title: 'পদার্থবিজ্ঞান',
      totalMarks: 14,
      questions: [
        {
          id: 1,
          content: {
            question: 'পাখি চালান দেওয়া কাদের ব্যবসা?',
            options: ['ব্যাধের', 'মালিনীর', 'আসামীর', 'মালির'],
            ans: 1,
          },
          subject: {
            id: 1,
            title: 'পদার্থবিজ্ঞান',
          },
          topic: {
            id: 1,
            topic: '',
          },
        },
        {
          id: 2,
          content: {
            question: "'অতিথির স্মৃতি' গল্পে কোন পাখিটি সবচেয়ে ভোরে উঠে?",
            options: ['ব্যাধের', 'দোয়েল', 'আসামীর', 'মালির'],
            ans: 2,
          },
          subject: {
            id: 1,
            title: 'পদার্থবিজ্ঞান',
          },
          topic: {
            id: 1,
            topic: '',
          },
        },
      ],
    },
    {
      id: 3,
      title: 'পদার্থবিজ্ঞান 1',
      totalMarks: 198,
      questions: [
        {
          id: 3,
          content: {
            question: 'পাখি চালান দেওয়া কাদের ব্যবসা?',
            options: ['ব্যাধের', 'মালিনীর', 'আসামীর', 'মালির'],
            ans: 1,
          },
          subject: {
            id: 1,
            title: 'পদার্থবিজ্ঞান',
          },
          topic: {
            id: 1,
            topic: '',
          },
        },
        {
          id: 4,
          content: {
            question: "'অতিথির স্মৃতি' গল্পে কোন পাখিটি সবচেয়ে ভোরে উঠে?",
            options: ['ব্যাধের', 'দোয়েল', 'আসামীর', 'মালির'],
            ans: 2,
          },
          subject: {
            id: 1,
            title: 'পদার্থবিজ্ঞান',
          },
          topic: {
            id: 1,
            topic: '',
          },
        },
      ],
    },
  ]

  const handleSelectAnswer = (questionId, i) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: i })
  }

  return (
    <div>
      <div tw="bg-[#0F0F0F] flex justify-between max-w-[900px] mx-auto items-center sticky top-[85px] py-6">
        <div tw="min-w-[120px]">
          <Timer />
        </div>

        <div tw="text-center">
          <div tw="py-2 text-xl font-semibold">ঢাবি ক ভর্তি পরীক্ষা</div>
          <div>প্রতিটি সঠিক উত্তর এর জন্য ১ নম্বর</div>
          <div>প্রতিটি ভুল উত্তর এর জন্য ০.২৫ নম্বর কর্তন করা হবে ।</div>
        </div>
        <button tw="border-none text-[#EEEEEE] text-lg bg-[#EB3656] outline-none rounded-full px-6 py-1 font-normal cursor-pointer mt-3">
          জমা দিন
        </button>
      </div>
      <div tw="max-w-[900px] rounded-lg min-h-[400px] mx-auto p-6 overflow-y-auto h-full">
        {groupBySubject.map((subject) => {
          return (
            <div key={subject.id} tw="my-12">
              <div tw="flex items-center justify-center">
                <div tw="text-xl font-semibold pb-6">
                  {subject.title}({b(subject.totalMarks)})
                </div>
              </div>
              {subject.questions.map((ques, i) => {
                return (
                  <div key={i} tw="mb-6">
                    <div tw="mb-3 text-lg">
                      {b(i + 1)}. {ques.content.question}
                    </div>
                    <div tw="grid grid-cols-2 gap-2">
                      {ques.content.options.map((option, i) => {
                        return (
                          <div
                            key={option}
                            css={[
                              tw`flex bg-gray-900 gap-1 rounded-md p-3 cursor-pointer`,
                              selectedAnswers[ques.id] === i &&
                                tw`bg-yellow-800`,
                            ]}
                            onClick={() => handleSelectAnswer(ques.id, i)}
                          >
                            <div
                              css={[
                                tw`text-[#EEEEEE] bg-transparent outline-none rounded-full h-5 w-5 font-normal cursor-pointer transition-all flex items-center justify-center`,
                              ]}
                            >
                              ({bengaliAlphabetMap[i]})
                            </div>
                            {option}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Exam

const bengaliAlphabetMap = {
  0: 'ক',
  1: 'খ',
  2: 'গ',
  3: 'ঘ',
  4: 'ঙ',
  5: 'চ',
  6: 'ছ',
  7: 'জ',
  8: 'ঝ',
  9: 'ঞ',
}

const Timer = ({ totalTime = 600 }) => {
  const [time, setTime] = useState(totalTime)
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (time > 0) {
        setTime((prevTime) => prevTime - 1)
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [time])

  return (
    <div tw="flex items-center gap-1 text-xl font-semibold">
      <span>সময়:</span>
      <div>
        <span>
          {b(
            Math.floor(time / 60) < 10
              ? `0${Math.floor(time / 60)}`
              : Math.floor(time / 60)
          )}
        </span>
        :<span>{b(time % 60 < 10 ? `0${time % 60}` : time % 60)}</span>
      </div>
    </div>
  )
}
