const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')

const placeSchema = new Schema({
    title: String,
    days: Number,
    image: String,
    description: String,
    location: String,
    reviews:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
})

placeSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        await Review.deleteMany({
            _id: {
                $in: doc.reviews     //doc has reviews and we delete all review where their id fild is in doc reviews array
            }                         
        })
    }
})



module.exports=mongoose.model('Place', placeSchema);