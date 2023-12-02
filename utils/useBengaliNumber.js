const englishToBengaliMapping = {
  0: '০',
  1: '১',
  2: '২',
  3: '৩',
  4: '৪',
  5: '৫',
  6: '৬',
  7: '৭',
  8: '৮',
  9: '৯',
}

const convertEnglishToBengali = (number) => {
  const englishNumber = number + ''
  let Bengali = ''

  for (let i = 0; i < englishNumber.length; i++) {
    const digit = englishNumber[i]
    if (englishToBengaliMapping[digit]) {
      Bengali += englishToBengaliMapping[digit]
    } else {
      Bengali += digit
    }
  }

  return Bengali
}

export { convertEnglishToBengali as eTob }
