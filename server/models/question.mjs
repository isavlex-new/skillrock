import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define the Question schema
const questionSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['multiple-choice', 'single-choice', 'true-false'], // You can add more types here
        required: true
    },
    options: [
        {
            text: { type: String, required: true },
            isCorrect: { type: Boolean, required: true }
        }
    ],
    explanation: {
        type: String, // Optional field to explain the correct answer
        trim: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
    },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Virtual field to validate the answer based on question type
questionSchema.virtual('isValid').get(function() {
    if (this.type === 'multiple-choice') {
        return this.options.filter(option => option.isCorrect).length > 1; // Ensure multiple correct answers
    }
    if (this.type === 'single-choice') {
        return this.options.filter(option => option.isCorrect).length === 1; // Ensure only one correct answer
    }
    if (this.type === 'true-false') {
        return this.options.length === 2 && this.options.some(option => option.isCorrect);
    }
    return false;
});

// Export the Question model
const Question = mongoose.model('Question', questionSchema);

export default Question;
