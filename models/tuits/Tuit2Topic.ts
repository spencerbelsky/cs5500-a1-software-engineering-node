/**
 * @file Creates the Tuit2Topic data type representing a composite class between Tuit and Topic.
 */
import Tuit from "./Tuit";
import Topic from "./Topic";

/**
 * @typedef Tuit2Topic Represents a Tuit2Topic object.
 * @property {string} topic the name of the tag created.
 * @property {string} tuit the tuit the topic belongs to.
 */
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