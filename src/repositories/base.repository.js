class BaseRepository {
  constructor (model, key) {
    this.model = model
    this.modelName = model.modelName.toLowerCase()
    this.key = key
  }

  findAll () {
    return this.model
      .find({}, '-_id -__v');
  }

  find (id) {
    const filter = {}
    filter[this.key] = id

    return this.model
      .findOne(filter, '-_id -__v');
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