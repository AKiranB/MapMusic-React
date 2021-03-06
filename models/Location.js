const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const locationSchema = new Schema(
    {
        name: String,
        description: String,
        coordinates: Array,
        logo: String,
    }
);

const Location = mongoose.model('Location', locationSchema)

module.exports = Location


