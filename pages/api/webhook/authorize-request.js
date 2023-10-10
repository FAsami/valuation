import { decode } from 'next-auth/jwt'

const authorizeRequest = async (req, res) => {
  const authToken = req.body.headers['mullayan-next-auth-token']
  if (authToken) {
    try {
      const { userId } = await decode({
        token: authToken,
        secret: process.env.NEXTAUTH_SECRET,
      })

      if (userId) {
        return res.status(200).json({
          'X-Hasura-User-Id': userId,
        })
      }
      return res
        .status(403)
        .json({ success: false, error: 'Unauthorize access' })
    } catch (error) {
      return res.status(404).json({ success: false, error: error.message })
    }
  } else {
    return res.status(200).json({
      success: false,
      error: 'Unauthorize access',
    })
  }
}
export default authorizeRequest
