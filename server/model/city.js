const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/0923', { useNewUrlParser: true, useUnifiedTopology: true })

const Schema = mongoose.Schema

const citySchema = new Schema({
    name: String,
    index: String
})

const City = mongoose.model('City', citySchema, 'city')
// const city = new City({
//     name: '北京',
//     index: 'B'
// })
// city.save().then(mon => {
//     console.log(mon)
// })
// City.findOneAndDelete('5f6ad14c48460458a45335e2').then(res => {
//     console.log(res)
// })
module.exports = City
