const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();

const hash = (payload) => bcrypt.hashSync(payload, salt);

const unhash = (payload, hashedPayload) =>
  bcrypt.compareSync(payload, hashedPayload);

module.exports = { hash, unhash };
