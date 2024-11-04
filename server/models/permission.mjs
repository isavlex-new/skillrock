import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
