import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'
const app = express()
const port = 8080

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({
  extended: true
}));

import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

const adapter = new JSONFile(file)
const defaultData = { users: [] }
const db = new Low(adapter, defaultData)

await db.read()

const apiKey="u8n2KZv8tMdsZTFH"

const users = [
  {
    email: "berke@gmail.com",
    password: "berke",
    role: "student",
    id: "1",
  },
  {
    email: "advisor1@example.com",
    password: "advisor1",
    role: "advisor",
  },
  {
    email: "student2@example.com",
    password: "student2",
    role: "student",
    id: "2",
  },
  {
    email: "advisor2@example.com",
    password: "advisor2",
    role: "advisor",
    id: "101",
  },
  // Add more users as needed
];

// AddUser
app.post('/addUser', async (req, res) => {
  const { role, email, password, apiKey } = req.body
  console.log(req.body)
  const user = await db.data.users.find((user) => user.email === email)
  if (user) {
    res.status(409).send('User already exists' + user)
  } else if (apiKey !== apiKey) {
    res.status(401).send('Invalid API key')
  } else {
    const newUser = {
      id: uuidv4(),
      role,
      email,
      password,
    }
    await db.data.users.push(newUser)
    await db.write()
    res.status(201).send(newUser)
  }
})

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await db.data.users.find((user) => user.email === email)
  if (user) {
    if (user.password === password) {
      res.status(200).send(user)
    } else {
      res.status(401).send(false)
    }
  } else {
    res.status(404).send(false)
  }
})

app.get('/', async (req, res) => {
  res.send('StudentPortal API')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})