import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    modules: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const Course = mongoose.model('Course', courseSchema);

export default Course
