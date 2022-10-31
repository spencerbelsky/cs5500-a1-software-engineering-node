/**
 * @file Creates the Tag data type representing a Tag and its details.
 */

/**
 * @typedef Tag Represents a tag object.
 * @property {string} tag the name of the tag created.
 */
export default class Tag {
    private tag: string = '';
    constructor(tag: string) {
        this.tag = tag;
    }
    get tuitTag() {
        return this.tag;
    }
}
