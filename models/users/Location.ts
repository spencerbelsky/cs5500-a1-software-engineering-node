/**
 * @file Represents the Location data type.
 */

/**
 * @typedef Location Represents the user's current location.
 * @property {number} latitude the current latitude.
 * @property {number} longitude the current longitude.
 */
export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
};
