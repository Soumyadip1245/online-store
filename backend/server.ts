import express from 'express'
import { amazonData } from './tools/fetchData/amazon'
import { blinkitData } from './tools/fetchData/blinkit'
import { shoppingData } from './tools/fetchData/shopping'
import { myntraData } from './tools/fetchData/myntra'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { Info } from './tools/fetchData/utils'
import Database from './tools/fetchDatabase/route/database'
import mongoose from 'mongoose'
import cors from 'cors'
dotenv.config()
const router = express()
const port = 8080
router.use(bodyParser.json())
router.use(cors())
router.use("/fetchDatabase", Database)
router.get('/', (req, res) => {
    return res.json({ data: "Online stores api working fine" })
})
router.post('/fetchData', async (req, res) => {
    const fetcher = parseInt(req.body.fetcher)
    const query = req.body.query
    let value!: Info
    switch (fetcher) {
        case 1:
            value = await amazonData(query)
            break
        case 2:
            value = await shoppingData(query)
            break;
        case 3:
            value = await myntraData(query)
            break;
        case 4:
            value = await blinkitData(query)
            break;
        default:
            value = { data: "Invalid Code", status: 500 }
            break;
    }
    if (value.status == 200) {
        return res.status(200).json({ data: value.data })
    }
    else {
        return res.status(500).json({ data: value.data })
    }
})
try {
    mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.sap1arc.mongodb.net/majorproject?retryWrites=true&w=majority`)
    console.log("Database Connected")
}
catch (e: any) {
    console.log(e.message)
}
router.listen(port, () => {
    console.log(`Server ${port}`)
})

