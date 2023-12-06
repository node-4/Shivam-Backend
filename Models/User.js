const mongoose = require('mongoose');
const moment = require('moment');
const OtpSchema = mongoose.Schema({
    magnitude: {
        type: String,
        required: true,
        index: true
    },
    created: {
        type: Date,
        // default: moment().utc()
        default: function () {
            return moment().utc();
        }
    },
    type: {
        type: String,
        enum: ['registration', 'password_reset', 'login']
    }
}, {
    _id: false,
    versionKey: false
});


const userSchema = mongoose.Schema({
    name: {
        type: String,

    },
    email: {
        type: String,


    },
    password: {
        type: String,

    },
    location: {
        type: String
    },
    vechicle: {
        type: String,
    },
    phone_number: {
        type: Number,
        required: true
    },
    country_code: {
        type: String,
        default: "+91",
    },
    order: {
        type: String
    },
    signup_process_complete: {
        type: Boolean,
        default: false
    },
    otp: {
        type: OtpSchema,
        select: false,
    },
    profile: {

        filename: {
            type: String,
            default: null
        },
        filesize: {
            type: String,
            default: null
        },
        filetype: {
            type: String,
            default: null
        },
        url: {
            type: String,
            required: null
        },

    }

},
    {
        timestamps: true,
        toJSON: { versionKey: false },
        toObject: { versionKey: false },
    })

module.exports =mongoose.model('user', userSchema)