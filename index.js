import express, { json } from 'express'
import admin from 'firebase-admin'
import { transactionsRouter } from './transactions/routes.js'

const app = express()
const port = process.env.PORT || 3000

admin.initializeApp({
  credential: admin.credential.cert('serviceAccountKey.json')
})

app.use(json())
app.use((request, response, next) => {
  // TODO: allow only secure origins
  response.header('Access-Control-Allow-Origin', '*')
  response.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PATCH,DELETE'
  )
  response.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use('/transactions', transactionsRouter)

app.listen(port, () => console.log(`API rest iniciada na porta ${port}`))
