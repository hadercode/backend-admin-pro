const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: false,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { collection: 'Hospitals' })//Set Collection Name

HospitalSchema.method( 'toJSON', function() {
    const { __v, ...object  } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema);