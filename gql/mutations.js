import { gql } from '@apollo/client'

export const UPDATE_STUDENT_INFO = gql`
  mutation update_student_info($id: Int!, $_set: users_set_input = {}) {
    update_users(where: { id: { _eq: $id } }, _set: $_set) {
      affected_rows
    }
  }
`
