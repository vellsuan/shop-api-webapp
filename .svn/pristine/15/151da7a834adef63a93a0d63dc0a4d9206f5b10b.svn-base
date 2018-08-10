'use strict';

const mongoose = require('mongoose');
const schema = require('./schema');

class MongooseStore {
  constructor ({
    collection = 'sessions',
    connection = mongoose,
    expires = 86400,
    name = 'Session'
  } = {}) {
    const updatedAt = { ...schema.updatedAt, expires };
    const { Schema } = connection;
    this.session = connection.model(name, new Schema({ ...schema, updatedAt }), collection);
  }

  async destroy (id) {
    const { session } = this;
    return session.remove({ id: id });
  }

  async get (id) {
    const { session } = this;
    const mode = await session.findById(id);
    return mode&&mode.data||{};
  }

  async set (id, data, maxAge, { changed, rolling }) {
    if (changed || rolling) {
      const { session } = this;
      const record = { id: id, data, updatedAt: new Date() };
      await session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
    }
    return data;
  }

  static create (opts) {
    return new MongooseStore(opts);
  }
}

module.exports = MongooseStore;
