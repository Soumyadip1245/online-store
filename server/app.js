var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var request = require('./routes/routeRequest')
var app = express()
app.use(cors())
app.use(bodyParser.json())
app.get("/",(req,res)=>{
    res.send({data: "Server Running"})
})
app.use('/v1', request)
app.listen(5500, () => {
    console.log(`Port: ${5500}`)
})