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
export const PRESETS = gql`
  subscription exam {
    examPresets {
      title
      time
    }
  }
`
export const GET_CLASSES = gql`
  query classes @cached {
    classes {
      id
      title
    }
  }
`
