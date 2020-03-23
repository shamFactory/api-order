class BaseRepository {
  constructor (model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  findAll (select) {
    select = select || '-_id -__v';
    return this.model
      .find({}, select);
  }

  find (id, select) {
    select = select || '-_id -__v';
    
    const filter = {}
    filter[this.key] = id

    return this.model
      .findOne(filter, select);
  }

  create (data) {
    return this.model
      .create(data)
  }

  createOrUpdate (objects) {
    return this.model.bulkWrite(
      objects.map((object) => {
        let filters = {};
        filters[this.data] = object[this.key];
          
        return {
          updateOne: {
            filter: filters,
            update: { $set: object },
            upsert: true
          }
        }
      })
    )
  }

}

module.exports = BaseRepository