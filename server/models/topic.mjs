import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String, required: true},
    module: {type: mongoose.Schema.Types.ObjectId, ref: 'Module'},
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question'}],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Topic = mongoose.model('Topic', topicSchema);

export default Topic;


