/**
 * @file Creates the Tuit2Tag data type representing a composite class between Tuit and Tag.
 */
import Tuit from "./Tuit";
import Tag from "./Tag";

/**
 * @typedef Tuit2Tag Represents a tuit2tag object.
 * @property {string} tag the name of the tag created.
 * @property {string} tuit the tuit that belongs to a topic.
 */
export default class Tuit2Tag {
    private tag: string;
    private tuit: Tuit;
    constructor(tag: string, tuit: Tuit) {
        this.tag = tag;
        this.tuit = tuit;
    }

    get getTag() {
        return this.tag;
    }

    get getTuit() {
        return this.tuit;
    }

}