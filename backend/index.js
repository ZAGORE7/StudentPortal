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
const defaultData = { users: [], courses: [], studentsadvisors: [], enrollments: [], classes: [], grades: [] }
const db = new Low(adapter, defaultData)

await db.read()

const apiKey="u8n2KZv8tMdsZTFH"


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

// Get request for user data by id using api key
app.get('/user/:api/:id', async (req, res) => {
  const { id, api } = req.params
  const user = await db.data.users.find((user) => user.id === id)
  if (user) {
    if (api === apiKey) {
      res.status(200).send(user)
    } else {
      res.status(401).send('Invalid API key')
    }
  } else {
    res.status(404).send('User not found')
  }
})

// give all courses
app.get('/courses/:api', async (req, res) => {
  const { api } = req.params
  if (api === apiKey) {
    res.status(200).send(db.data.courses)
  } else {
    res.status(401).send('Invalid API key')
  }
})

// save enrollment data first check api key then save user id and course id to enrollments by using get
app.get('/enroll/:api/:uid/:cid', async (req, res) => {
  const { api, uid, cid } = req.params
  if (api === apiKey) {
    const enrollment = {
      id: uuidv4(),
      userId: uid,
      courseId: cid,
    }
    await db.data.enrollments.push(enrollment)
    await db.write()
    res.status(201).send(enrollment)
  } else {
    res.status(401).send('Invalid API key')
  }
})

// remove enrollment data first check api key then remove user id and course id from enrollments by using get
app.get('/unenroll/:api/:uid/:cid', async (req, res) => {
  const { api, uid, cid } = req.params
  if (api === apiKey) {
    const enrollment = await db.data.enrollments.find((enrollment) => enrollment.userId === uid && enrollment.courseId === cid)
    if (enrollment) {
      await db.data.enrollments.splice(enrollment, 1)
      await db.write()
      res.status(200).send(enrollment)
    } else {
      res.status(404).send('Enrollment not found')
    }
  } else {
    res.status(401).send('Invalid API key')
  }
})

// get users enrolled courses by using get
app.get('/enrolled/:api/:uid', async (req, res) => {
  const { api, uid } = req.params
  if (api === apiKey) {
    const enrollments = await db.data.enrollments.filter((enrollment) => enrollment.userId === uid)
    if (enrollments) {
      const courses = []
      for (const enrollment of enrollments) {
        const course = await db.data.courses.find((course) => course.id == enrollment.courseId)
        courses.push(course)
      }
      res.status(200).send(courses)
    } else {
      res.status(404).send('Enrollment not found')
    }
  } else {
    res.status(401).send('Invalid API key')
  }
})

app.get('/', async (req, res) => {
  res.send('StudentPortal API')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})