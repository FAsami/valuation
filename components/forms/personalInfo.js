import React from 'react'
import { Form, Input, Button, message, Radio, Result } from 'antd'
import { PhoneOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons'
import tw from 'twin.macro'
import { useMutation, useQuery } from '@apollo/client'
import { GET_CLASSES } from '../../gql/queries'
import Loader from '../Loader'
import { UPDATE_STUDENT_INFO } from '../../gql/mutations'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const PersonalInformationForm = () => {
  const { query, push } = useRouter()
  const { data } = useSession()
  const [updateStudentInfo, { updatingStudentInfo, studentInfoError }] =
    useMutation(UPDATE_STUDENT_INFO)

  const userId = data?.user?.userId

  const onFinish = (values) => {
    if (userId) {
      updateStudentInfo({
        variables: {
          id: userId,
          _set: {
            name: values.name,
            phoneNo: values.phoneNumber,
            institutionInfo: {
              name: values.institution,
            },
            class: values.discipline,
          },
        },
        onCompleted: () => {
          if (query?.callbackUrl) {
            push(query?.callbackUrl)
          } else {
            push('/')
          }
        },

        onError: () => message.error('Something went wrong !'),
      })
    } else {
      console.error('USER ID')
      message.error('Something went wrong !')
    }
  }

  const { data: { classes = [] } = {}, loading, error } = useQuery(GET_CLASSES)
  if (loading) {
    return <Loader />
  }
  console.log(error)
  if (error) {
    return (
      <Result
        status="error"
        title={
          <div>
            <strong>দুঃখিত !</strong> <br />
            এই কারিগরি ত্রুটির জন্য ।
            <br />
            দয়া করে পেইজটি রিফ্রেশ করে আবার চেষ্টা করুন ।
          </div>
        }
      />
    )
  }

  return (
    <div tw="max-w-[600px] mx-auto mt-8 md:mt-24 px-6">
      <Form onFinish={onFinish} layout="vertical" autoComplete="off">
        <Form.Item
          label="নাম"
          name="name"
          rules={[{ required: true, message: 'Please enter your name!' }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Enter your full name "
            tw="h-11"
          />
        </Form.Item>
        <Form.Item
          label="মুঠোফোন"
          name="phoneNumber"
          rules={[{ required: false, message: 'Please enter your name!' }]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Enter your phone number "
            tw="h-11"
          />
        </Form.Item>

        <Form.Item
          label="প্রতিষ্ঠান"
          name="institution"
          rules={[
            { required: true, message: 'Please enter institution name!' },
          ]}
        >
          <Input
            prefix={<ReadOutlined />}
            placeholder="Name of your institute "
            tw="h-11"
          />
        </Form.Item>
        <Form.Item
          label="শিক্ষা স্তর"
          name="discipline"
          rules={[{ required: true, message: 'Please select a discipline!' }]}
        >
          <Radio.Group size="large" buttonStyle="solid">
            {classes.map(({ id, title }) => {
              return (
                <Radio.Button key={id} value={id}>
                  {title}
                </Radio.Button>
              )
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item>
          <div tw="flex justify-center mt-4 md:mt-8">
            <Button
              tw="md:w-56 w-full flex justify-center !rounded-full"
              size="large"
              type="primary"
              htmlType="submit"
              loading={updatingStudentInfo}
            >
              সাবমিট
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}

export { PersonalInformationForm }
