import { gql } from '@apollo/client'

export const EXAM_PRESETS = gql`
  query PRESETS {
    examPresets {
      id
      negativeMarkWeight
      questionWeight
      time
      title
      totalMarks
      updated_at
      created_at
    }
  }
`
