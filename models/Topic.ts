export default class Topic {
    private topic: string = '';
    constructor(topic: string) {
        this.topic = topic;
    }
    get getTopic(): string {
        return this.topic;
    }
};
