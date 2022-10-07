import User from "./User";

export default class Tuit {
    private id: string;
    private tuit: string = '';
    private postedOn: Date;
    private postedBy: User | null = null;
    constructor(id: string, tuit: string, postedBy: any, postedOn: Date,) {
        this.id = id;
        this.tuit = tuit;
        this.postedOn = postedOn;
        this.postedBy = postedBy;
    }
    get getTid(): string {
        return this.id;
    }

    get getPost(): string {
        return this.tuit;
    }

    get getDate(): Date {
        return this.postedOn
    }

    get getAuthor(): User {
        return <User>this.postedBy
    }

    public set setAuthor(user: User | null) { this.postedBy = user; }
}
