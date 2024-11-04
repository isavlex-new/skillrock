import Question from '../models/question.mjs';


export const seedQuestions = async () => {
    const count = await Question.countDocuments();
    if (!count) {
        await Question.insertMany([{
            text: 'how to 2 x 2',
            type: 'single-choice',
            explanation: 'Math task',
            difficulty: 'easy',
            options: [{text: '4', isCorrect: true}, {text: '120', isCorrect: false}]
        }]);

        await Question.deleteOne({text: 'how to 2 x 2'});
    } 
}