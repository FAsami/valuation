import { isClient } from '../utils'
import { eTob } from '../utils/useBengaliNumber'
import { useRouter } from 'next/router'
import React from 'react'
import { css } from 'styled-components'
import tw from 'twin.macro'

const MockTest = () => {
  const router = useRouter()

  const presets = [
    {
      id: 1,
      title: 'ঢাবি ক',
      time: 45,
      totalMarks: 120,
      maxOptionalSubject: 1,
      subjects: [
        {
          id: 10,
          title: 'পদার্থবিজ্ঞান',
          isOptional: false,
          numberOfQuestions: 25,
        },
        {
          id: 11,
          title: 'রসায়ন',
          isOptional: false,
          numberOfQuestions: 25,
        },
        {
          id: 12,
          title: 'ICT',
          isOptional: false,
          numberOfQuestions: 25,
        },
        {
          id: 13,
          title: 'উচ্চতর গণিত',
          isOptional: true,
          numberOfQuestions: 25,
        },
        {
          id: 14,
          title: 'জীববিজ্ঞান',
          isOptional: true,
          numberOfQuestions: 25,
        },
        {
          id: 15,
          title: 'বাংলা',
          isOptional: true,
          numberOfQuestions: 25,
        },
      ],
    },
    {
      id: 2,
      title: 'ঢাবি খ',
      time: 40,
      totalMarks: 100,
      maxOptionalSubject: 2,
      subjects: [
        {
          id: 1,
          title: 'পদার্থবিজ্ঞান 1',
          isOptional: false,
          numberOfQuestions: 25,
        },
        {
          id: 2,
          title: 'রসায়ন 1',
          isOptional: false,
          numberOfQuestions: 35,
        },
        {
          id: 3,
          title: 'ICT 1',
          isOptional: false,
          numberOfQuestions: 20,
        },
        {
          id: 4,
          title: 'উচ্চতর গণিত 1',
          isOptional: true,
          numberOfQuestions: 20,
        },
        {
          id: 5,

          title: 'জীববিজ্ঞান 1',
          isOptional: true,
          numberOfQuestions: 20,
        },
        {
          id: 6,
          title: 'বাংলা 1',
          isOptional: true,
          numberOfQuestions: 50,
        },
      ],
    },
  ]
  const [selectedPreset, setSelectedPreset] = React.useState(null)

  React.useEffect(() => {
    if (presets) {
      setSelectedPreset({
        ...presets[0],
        selectedOptional: [],
      })
    }
  }, [])

  const handleSelectPreset = (preset) => {
    setSelectedPreset({
      ...preset,
      selectedOptional: [],
    })
  }

  const handleSelectOptionalSubject = (sub) => {
    if (
      selectedPreset.selectedOptional.length >=
        selectedPreset.maxOptionalSubject &&
      !selectedPreset.selectedOptional.some((s) => s.id === sub.id)
    ) {
      const selectedOptionalSubjects = selectedPreset.selectedOptional
      selectedOptionalSubjects.pop()
      selectedOptionalSubjects.push(sub)
      setSelectedPreset({
        ...selectedPreset,
        selectedOptional: selectedOptionalSubjects,
      })
    } else {
      if (selectedPreset.selectedOptional.some((s) => s.id === sub.id)) {
        setSelectedPreset({
          ...selectedPreset,
          selectedOptional: selectedPreset.selectedOptional.filter(
            (s) => s.id !== sub.id
          ),
        })
      } else {
        setSelectedPreset({
          ...selectedPreset,
          selectedOptional: [...selectedPreset.selectedOptional, sub],
        })
      }
    }
  }
  const handleStartExam = () => {
    isClient && localStorage.setItem('userData', JSON.stringify(selectedPreset))
    router.push('/exam/1')
  }

  if (!presets) {
    return <div>No</div>
  }

  return (
    <div tw="mx-4">
      <div tw="py-4 flex items-center justify-center gap-3">
        {presets.map((preset) => {
          return (
            <button
              key={preset.id}
              css={[
                tw`border-none text-[#EEEEEE] bg-gray-800 outline-none rounded-full px-6 py-2 font-normal cursor-pointer hover:bg-[#EB3656] transition-all`,
                preset.id === selectedPreset?.id && tw`bg-[#EB3656]`,
              ]}
              onClick={() => handleSelectPreset(preset)}
            >
              {preset.title}
            </button>
          )
        })}
      </div>
      <div tw="bg-[#161515] max-w-[800px] rounded-lg min-h-[400px] mx-auto my-4">
        <div tw="text-center text-2xl font-light pt-4">প্রশ্ন বণ্টন</div>
        <div tw="text-center text-sm font-light pb-4">
          সময়ঃ {eTob(selectedPreset?.time)} মিনিট
        </div>
        <div>
          {selectedPreset?.subjects
            ?.filter((sub) => !sub.isOptional)
            .map((sub) => {
              return (
                <div
                  key={sub.id}
                  tw="text-lg flex items-center justify-between px-4 py-2 bg-[#0F0F0F] max-w-[300px] mx-auto rounded-md mb-2"
                >
                  <div>{sub.title}</div>
                  <div>{eTob(sub.numberOfQuestions)}</div>
                </div>
              )
            })}
        </div>
        <div tw="mx-8 py-4">
          <div
            css={[
              css`
                border-bottom: 0.5px solid #eb3656;
              `,
            ]}
            tw="font-medium my-2 text-lg"
          >
            ঐচ্ছিক - যে কোন {eTob(selectedPreset?.maxOptionalSubject)} টি
          </div>
          <div tw="flex gap-2">
            {selectedPreset?.subjects
              ?.filter((sub) => sub.isOptional)
              .map((sub) => {
                return (
                  <button
                    key={sub.id}
                    css={[
                      tw`text-base px-4 py-2 bg-[#0F0F0F90] rounded-full bg-[#0F0F0F] border-none cursor-pointer`,
                      selectedPreset?.selectedOptional.find(
                        (_sub) => _sub.id === sub.id
                      ) && tw`bg-[#EB3656]`,
                    ]}
                    onClick={() => handleSelectOptionalSubject(sub)}
                  >
                    {sub.title}({eTob(sub.numberOfQuestions)})
                  </button>
                )
              })}
          </div>
        </div>
      </div>
      <div tw="flex justify-center">
        <button
          onClick={handleStartExam}
          tw="border-none text-[#EEEEEE] text-lg bg-[#EB3656] outline-none rounded-full px-6 py-2 font-normal cursor-pointer mt-3"
        >
          পরীক্ষা শুরু করো
        </button>
      </div>
    </div>
  )
}

export default MockTest
