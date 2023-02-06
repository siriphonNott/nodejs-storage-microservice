import { config } from 'dotenv'
config({ path: `./.env.${process.env.NODE_ENV}` })

export default {
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL,
  isProduction: process.env.NODE_ENV === 'production',
  apiVersion: process.env.API_VERSION || 1,
  buildVersion: process.env.BUILD_VERSION || 1,
  limitFileSize: process.env.LIMIT_FILE_SIZE || 200000,
  secretKey: process.env.SECRET_KEY,
  dbUsername: process.env.DB_USERNAME,
  dbHostname: process.env.DB_HOSTNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbDatabase: process.env.DB_DATABASE,
}
