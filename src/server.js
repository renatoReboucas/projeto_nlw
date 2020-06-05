const express = require("express")
const nunjucks = require("nunjucks")
const server = express()

//configurar pasta public
server.use(express.static("public"))

nunjucks.configure("src/views",{
  express: server,
  noCache: true
})

// configura nunjucks
server.get("/", (req,res) => {
  return res.render("index.html")
})
server.get("/create-point", (req,res) => {
  return res.render("create-point.html")
})

server.listen(3333)

// aula 04 1h:09min