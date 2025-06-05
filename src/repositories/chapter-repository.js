const Chapter=require('../models/Chapter');
const crudRepository=require('./crud-repository');
class chapterRepository extends crudRepository{
    constructor(){
        super(Chapter);
    }
}

module.exports=chapterRepository;