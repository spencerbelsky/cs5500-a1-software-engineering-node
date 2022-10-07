import Tuit from "../models/Tuit";
import TuitModel from "../mongoose/TuitModel";
import TuitDaoI from "../interfaces/TuitDaoI";
import tuitModel from "../mongoose/TuitModel";

export default class TuitDao implements TuitDaoI {
    private static tuitDao: TuitDao | null = null
    public static getInstance = (): TuitDao => {
        if (TuitDao.tuitDao === null) {
            TuitDao.tuitDao = new TuitDao();
        }
        return TuitDao.tuitDao;
    }
    private constructor() {
    }

    public async findTuitById(tid: string): Promise<Tuit | null> {
        const tuitMongooseModel = await TuitModel.findById(tid).populate('postedBy').exec();
        const tuit = new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit ?? '',
            tuitMongooseModel?.postedBy,
            new Date(tuitMongooseModel?.postedOn ?? (new Date())),
        );
        return tuit;
    }

    async findAllTuits(): Promise<Tuit[]> {
        const tuitMongooseModels = await TuitModel.find();
        const tuitModels = tuitMongooseModels.map((tuitMongooseModel) =>
        {
            return new Tuit(
                tuitMongooseModel?._id.toString() ?? '',
                tuitMongooseModel?.tuit ?? '',
                tuitMongooseModel?.postedBy,
                new Date(tuitMongooseModel?.postedOn ?? (new Date())));
        });
        return tuitModels;
    }

    async findTuitsByUser(uid: string): Promise<Tuit[]> {
        const tuitMongooseModels = await tuitModel.find({postedBy: uid});
        const tuitModels = tuitMongooseModels.map((tuitMongooseModel) => {
            return new Tuit(
                tuitMongooseModel?._id.toString() ?? '',
                tuitMongooseModel?.tuit ?? '',
                tuitMongooseModel?.postedBy,
                new Date(tuitMongooseModel?.postedOn ?? (new Date())));
        });
        return tuitModels;
    }

    public async createTuit(tuit: any): Promise<Tuit> {
        const tuitMongooseModel = await tuitModel.create(tuit);
        return new Tuit(
            tuitMongooseModel?._id.toString() ?? '',
            tuitMongooseModel?.tuit,
            tuitMongooseModel?.postedBy,
            new Date(tuitMongooseModel?.postedOn ?? (new Date()))
        )
    }

    public async deleteTuit(tid: string): Promise<any> {
        return await TuitModel.deleteOne({_id: tid});
    }


    public async updateTuit(tid: string, tuit: Tuit): Promise<any> {
        return TuitModel.updateOne(
            {_id: tid},
            {
                $set: {
                    tuit: tuit.getPost, postedOn: tuit.getDate, postedBy: tuit.getAuthor.getUid
                }
            });
    }

}