express = require 'express'

app = express.createServer express.logger()

app.put '/', (req, res) ->
  res.send JSON.stringify { status: "success" }

port = process.env.PORT or 3000

app.listen port, ->
  console.log "Listening on " + port
