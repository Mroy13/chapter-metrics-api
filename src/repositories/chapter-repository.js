const Chapter=require('../models/Chapter');
const crudRepository=require('./crud-repository');
class chapterRepository extends crudRepository{
    constructor(){
        super(Chapter);
    }


    async getFilteredChapters(filters = {}, page = 1, limit = 10) {
        const query = {};

        // Apply filters if present
        if (filters.class) query.class = filters.class;
        if (filters.unit) query.unit = filters.unit;
        if (filters.subject) query.subject = filters.subject;
        if (filters.status) query.status = filters.status;
        if (filters.weakChapter !== undefined) query.isWeakChapter = filters.weakChapter;

        const skip = (page - 1) * limit;

        const chapters = await this.model.find(query).skip(skip).limit(limit);
        return chapters;
    }
}

module.exports=chapterRepository;