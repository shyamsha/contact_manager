//db configuration

const mongoose = require('mongoose')
const path = 'mongodb://localhost:27017/contact-manger'

mongoose.Promise = global.Promise
mongoose.connect(path, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to db')
    })
    .catch((err) => {
        console.log('Error connecting to DB', err)
    })
module.exports = {
    mongoose
}
