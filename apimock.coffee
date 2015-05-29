express = require 'express'
app = express()

app.use express.static process.env.webapp

app.get '/api/v1/auth', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success'
    access_token: 'sdfasdioahsdoifsafjsidfmsds'
    email: req.params.email
  }

app.post '/api/v1/auth', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success'
    access_token: 'sdfasdioahsdoifsafjsidfmsds'
    email: req.params.email
  }

app.listen process.env.port
