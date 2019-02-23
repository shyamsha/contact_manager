const express = require('express')
const app = express()
const mongoose = require('mongoose')
const port = 3000
app.use(express.json())
url = 'mongodb://localhost:27017/movies'

//db configuration
mongoose.Promise = global.Promise
mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Suceessfully contection establish to DB');
}).catch((err) => {
    console.log(err);
})
//create schema
const schema = mongoose.Schema
const movieschema = new schema({
    Name: {
        type: String,
        required: true,
        minlength: 1,
    },
    YearOfRelease: {
        type: String,
        required: true,
        maxlength: 4,
        minlength: 4
    },
    Cast: {
        Hero: {
            type: String,
            required: true
        },
        Heroine: {
            type: String,
            required: true
        }
    },
    Website: {
        type: String,
        default: 'www.imdb.com'
    }
})
//create model
const Movie = mongoose.model('Movie', movieschema)

//home page
app.get('/movies', (req, res) => {
    Movie.find().then((movies) => {
        if (movies.length != 0) {
            res.send(movies)
        } else {
            res.send('404 nothing found')
        }
    }).catch(() => {})
})
app.post('/movies', (req, res) => {
    const movie = new Movie(req.body)
    movie.save().then((movie) => {
        res.send(movie)
    }).catch((err) => {
        err
    })
})
app.listen(port, () => console.log('listing from', port))
