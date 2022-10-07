import Tuit from "./Tuit";
import Topic from "./Topic";

export default class Tuit2Topic {
    private topic: string;
    private tuit: Tuit;
    constructor(topic: string, tuit: Tuit) {
        this.topic = topic;
        this.tuit = tuit;
    }

    get getTag() {
        return this.topic;
    }

    get getTuit() {
        return this.tuit;
    }

}