const express = require('express')
const app = express()

//configurar pasta public
app.use(express.static("public"))

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/src/views/index")
})

app.listen(3333)