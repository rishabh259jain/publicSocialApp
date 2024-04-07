const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        phone: {type: String,},
        name: { type: String},
        email: { type: String, required: true, unique: true},
        password: String, 
        bio: String,
        photo: String,
        isAdmin: { type: Boolean, default: false },
        isPublic: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// UserSchema.pre('save', function (next) {
//   let data = this;
//   data.location = data.location.toUpperCase();
//   next();
// });

UserSchema.post('save', function() {
  let data = this;
  data.updatedAt = new Date();
});

module.exports = mongoose.model('users', UserSchema);