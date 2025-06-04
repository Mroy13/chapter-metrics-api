const StatusCode = require('http-status-codes');
const Apperror = require('../utils/error/App-error');
class crudRepository {
    constructor(model) {
        this.model = model;
    }

    async create(data) {
        const response = await this.model.create(data);
        return response;

    }

    async get(id) {
        try {
            const response = await this.model.findById(id);
            if (!response) {
                throw new Apperror("resource not found", StatusCode.NOT_FOUND);
            }
            return response;
        } catch (error) {
            if(error.name=="CastError"){
                throw new Apperror("invalid object id",StatusCode.BAD_REQUEST);
            }
          //  console.log(error);
            throw error;
        }
    }


    async getAll() {
        const response = await this.model.find();
        return response;
    }


    async destroy(id) {
        try {
           // const res = await this.model.findByIdAndDelete(id);
           // const res = await this.model.findOneAndDelete({ _id:id});
            const res = await this.model.deleteOne({ _id:id});
            if (!res) {
                throw new Apperror("resource not found", StatusCode.NOT_FOUND);
            }
            //console.log(res);
            return res;

        } catch (error) {
           // console.log(error);
           if(error.name=="CastError"){
            throw new Apperror("invalid object id",StatusCode.BAD_REQUEST);
        }
            throw error
        }
    }

    async update(id, data) {
        try {
            if(!data){
                throw new Apperror("data not present for update", StatusCode.BAD_REQUEST);
            }
            const res = await this.model.findOneAndUpdate({ _id: id }, data, { new: true });
            if (!res) {
                throw new Apperror("resource not found", StatusCode.NOT_FOUND);
            }
            return res;
        } catch (error) {
            if(error.name=="CastError"){
                throw new Apperror("invalid object id",StatusCode.BAD_REQUEST);
            }
            throw error;
        }
    }


}
module.exports = crudRepository