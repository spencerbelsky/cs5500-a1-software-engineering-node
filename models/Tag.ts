export default class Tag {
    private tag: string = '';
    constructor(tag: string) {
        this.tag = tag;
    }
    get tuitTag() {
        return this.tag;
    }
}
