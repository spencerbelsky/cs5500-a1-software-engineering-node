export default class Location {
    public latitude: number = 0.0;
    public longitude: number = 0.0;
    constructor(latitude: number, longitude: number) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

    get getLatitude(): number {
        return this.latitude;
    }

    get getLongitude(): number {
        return this.longitude;
    }
};
