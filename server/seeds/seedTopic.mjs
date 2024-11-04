import Topic from '../models/topic.mjs';

export async function createTopics() {
    await Topic.insertMany([{
        title: 'Test',
        content: 'test test',
    }])
}