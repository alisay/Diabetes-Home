import mongoose from "mongoose"
import 'dotenv/config'

mongoose.connect(process.env.URI,   () => {
    console.log("Connected!");
})