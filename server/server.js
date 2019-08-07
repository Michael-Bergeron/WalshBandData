const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const path = require('path');
const db = require('./db.js');
const cookieParser = require('cookie-parser');
const crypto = require('crypto')

const app = express();
app.use(cors());
app.use(cookieParser());


app.use(express.static(path.join(__dirname, '../dist')))
app.use(parser.json());

app.get('/emails', (req, res) => {
  db.getEmails(JSON.parse(req.query.submitData), (results) => res.send(results))
})

app.get('/categories', (req, res) => {
  db.getCategories((results) => res.send(results))
})

app.get('/login', (req, res) => {
  let newCookie = crypto.randomBytes(20).toString('hex')
  res.cookie('WalshBand', newCookie)
  db.login(req.query, newCookie, (result) => {
    res.send(result)
  })
})

app.get('/getStudent', (req, res) => {
  db.getStudent(req.query, (result) => res.send(result))
})

app.get('/checkCookie', (req, res) => {
  db.checkCookie(req.cookies.WalshBand, (login) => {
    res.send(login)
  })
})

app.post('/editStudent', (req, res) => {
  db.editStudent(req.body, (response) => {
    res.send('updated')
  })
})

app.get('/getAll', (req, res) => {
  db.getAll((data) => {
    res.send(data)
  })
})

app.post('/addStudent', (req, res) => {
  db.addStudent(req.body, (response) => {
    res.send('added')
  })
})

app.listen(3050, () => console.log('listening on port 3050'));