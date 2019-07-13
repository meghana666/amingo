const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const PostSchema = new Schema ({
    message: {
        type: String,
        required: true
    },
    user:{ 
        
        type: Schema.ObjectId, ref:"user"

},
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = Post = mongoose.model('post', PostSchema);