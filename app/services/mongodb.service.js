class MongoDbService {
    constructor(model) {
      this.model = model;
    }

    async createDocument(inserData) {
        try {
          const document = new this.model(inserData);
          return await document.save();
        } catch (error) {
          throw new Error(error);
        }
    }
    
    async readOneDocument(filter, select = {}) {
        try {
          const document = await this.model.findOne(filter).select(select).lean();
    
          return document;
        } catch (error) {
          throw new Error(error);
        }
    }
    
    async updateDocument(filter, updateQuery, options = {}) {
        try {
          let {populate, ...updateOptions} = options;
          populate = populate || "";
          const document = await this.model
            .findOneAndUpdate(filter, updateQuery, {
              new: true,
              runValidators: true,
              ...updateOptions,
            })
            .populate(populate)
            .lean();
          return document;
        } catch (error) {
          throw new Error(error);
        }
    }
    
    async readAllDocuments({filter, select, sort, skip, limit, page}) {
        filter = filter || {};
        select = select || {};
        sort = sort || {};
        skip = skip || 0;
        limit = limit || 0;
        const documents = await this.model
          .find(filter)
          .select(select)
          .sort(sort)
          .skip(skip)
          .limit(limit)
          .lean();
    
        if (page) {
          const item_total = await this.model.countDocuments(filter);
          const totalPages = Math.ceil(item_total / limit) || 1;
    
          const pagination = {
            current: page,
            has_next: page < totalPages ? true : false,
            has_previous: page === 1 || page > totalPages ? false : true,
            item_total,
            total: totalPages,
          };
    
          return {documents, page: pagination};
        }
    
        return {documents};
    }
}

module.exports = MongoDbService