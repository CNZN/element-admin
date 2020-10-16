const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/0923', { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema

const movieSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    desc: {
        type: String,
        default: ''
    },
    star: {
        type: String,
        default: ''
    },
    score: {
        type: String,
        default: ''
    },
    img: {
        type: String,
        default: ''
    },
    p : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'City'
    }
})

const Movie = mongoose.model('Movie', movieSchema, 'movie')

// const movie = new Movie({
//     name: '一路向北',
//     desc: '风在山路吹 离开有你的季节 ',
//     score:5.0,
//     img:''
// })
// movie.save().then(mon => {
//     console.log(mon)
// })

module.exports = Movie


// '5f6ad174266b5241fc95a435'