const mongoose = require('mongoose');

const WalletSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        refPath: "user_type"
    },
    installer: {
        type: Schema.Types.ObjectId, 
        ref:"insteller"
    },
    user_type: {
        type: String,
        enum: ["user", "seller", "installer"]
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

module.exports =mongoose.model('wallet', WalletSchema)