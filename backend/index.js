const express = require('express')
const app = express()
const port = 4000
const cors = require('cors')

//database
const db = require('./3_database/mysql')
const productRouter = require('./1_routers/products')
db.connect()


app.use(express.json())
app.use(cors())

app.use(`/product`, productRouter)
app.use('/public', express.static('public'))

app.get(`/`, (req,res)=>{
    res.send(`Welcome to the API`)
})

app.listen(port, () => {
    console.log(`server runing on port ${port}`)
})