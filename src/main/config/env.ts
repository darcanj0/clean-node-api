export default {
  mongoUri: 'mongodb+srv://daniel:young100@clean-node-api-db.bgtfgvj.mongodb.net/?retryWrites=true&w=majority' || 'mongodb://localhost:27017/clean-node-api',
  port: process.env.PORT || 5050,
  jwtSecret: process.env.JWT_SECRET || '1ce992bc-4066-4abb-b759-688a6386e34c'
}
