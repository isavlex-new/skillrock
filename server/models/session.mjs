import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema({
    refreshToken: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;