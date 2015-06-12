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

app.post '/api/v1/posts', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success'
  }

app.get '/api/v1/search', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success'
    posts: 
      [
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
        {title:"Hello", body:"Hello World."},
      ]
    tags: 
      [
        {tag:"Hello"},
        {tag:"Hello"},
        {tag:"Hello"},
        {tag:"Hello"},
        {tag:"Hello"},
        {tag:"Hello"},
      ]
  }

app.listen process.env.port
