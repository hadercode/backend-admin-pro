const { Schema, model } = require('mongoose');

const DoctorSchema = Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    licence: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
    
}, { collection: 'Doctors' })//Set Collection Name

DoctorSchema.method( 'toJSON', function() {
    const { __v, ...object  } = this.toObject();
    return object;
});

module.exports = model('Doctor', DoctorSchema);