// Load envioronment variables
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')
// Connect to your mongo database using the MONGO_URL environment

const mongooseClient = mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'demo'
    },
        // (err) => {
        //     if (err) {
        //         console.log('Error connecting to database', err);
        //     } else {
        //         console.log('Connected to database!');
        //     }
        // }
    )
    .then((m) => m.connection.getClient())

// mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'demo'
// })

// Exit on error
// const db = mongoose.connection.on('error', err => {
//     console.error(err);
//     process.exit(1)
// })
// Log to console once the database is open
// db.once('open', async () => {
//     console.log(`Mongo connection started on ${db.host}:${db.port}`)
// })

require('./admin')

module.exports = mongooseClient