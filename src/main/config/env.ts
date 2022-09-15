export default {
  mongoUri: process.env.MONGO_URL || 'mongodb://mongo:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '1ce992bc-4066-4abb-b759-688a6386e34c'
}
