module.exports = class GenericModel {
    constructor(Entity) {
        this.DbAccess = Entity;
    }

    async getMany(params = {
        query: {},
        select: '',
        sort: {_id: 1},
        page: 1,
        limit: 15,
        populate: []
    }) {

        const {query} = params

        const response = await this.DbAccess.paginate(query, params);

        let docs = response.docs;

        if (docs && docs.length === 0) {
            return {
                pagination: {
                    hasNext: false,
                    total: 0
                },
                data: [],
            };
        }

        return {
            pagination: {
                hasNext: response.hasNextPage,
                total: response.totalDocs
            },
            data: docs,
        };
    }

    async getOne(params = {query: {}, select: '', populate: []}) {
        const {query, select, populate} = params;
        return this.DbAccess.findOne(query, select).populate(populate);
    }

    async count(params = {filter: {}}) {
        const {filter} = params;
        return this.DbAccess.countDocuments(filter);
    }

    async save(modelSchema) {
        await modelSchema.save();
        return modelSchema;
    }

    async update(params = {modelSchema, filter, populate: []}) {
        const {modelSchema, filter, populate} = params;
        return await this.DbAccess.findOneAndUpdate(filter, modelSchema, {
            runValidators: true,
            new: false
        }).populate(populate)
    }

    async delete(modelSchema) {
        await modelSchema.deleteOne();
    }
}