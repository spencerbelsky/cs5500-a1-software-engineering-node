/**
 * @file Creates the Topic data type representing a Topic and its details.
 */

/**
 * @typedef Topic Represents a topic object.
 * @property {string} topic the name of the topic created.
 */
export default class Topic {
    private topic: string = '';
    constructor(topic: string) {
        this.topic = topic;
    }
    get getTopic(): string {
        return this.topic;
    }
};
