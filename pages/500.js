import { Result } from 'antd'

const Custom500 = () => {
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
export default Custom500
