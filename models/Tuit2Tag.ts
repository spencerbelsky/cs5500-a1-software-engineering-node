import Tuit from "./Tuit";
import Tag from "./Tag";

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