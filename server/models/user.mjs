import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    avatar: String,
    birthday: Date,
    username: String,
    password: String,
    role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
    sessions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Session'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

export default User;
