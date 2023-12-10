const withTwin = require('./config/withTwin')
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTwin({
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
})
