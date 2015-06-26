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

app.get '/api/v1/posts/:id', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success',
    post: {title:"Hello" + req.params.id, body:"#Hello World.", is_wip:true, revisions: [
      {headline:"Add #Hello", full_text:"#Hello", diff_text:"+#Hello"},
      {headline:"Add World.", full_text:"#Hello World.", diff_text:"+ World."},
    ]}
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
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
        {title:"Hello", body:"Hello World.", is_wip:true},
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

app.get '/api/v1/index/all', (req, res) ->
  res.set 'Content-Type', 'application/json'
  res.send JSON.stringify {
    status: 'success'
    indexes: 
      [
        {id:"001", title:"日報", type:"node", nodes: [
          {id:"002", title:"0601", type:"node", nodes: [
            {id:"003", title:"UserA", type:"item", post: "1"}
          ]}
        ]}
        {id:"101", title:"月報", type:"node", nodes: [
          {id:"102", title:"06", type:"node", nodes: [
            {id:"103", title:"UserA", type:"item", post: "2"}
          ]}
        ]}
        {id:"501", title:"SetUp", type:"node", nodes: [
          {id:"502", title:"Download", type:"item", post: "3"},
          {id:"503", title:"Install", type:"item", post: "4"},
        ]}
      ]
  }


app.listen process.env.port
