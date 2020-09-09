// eslint-disable-next-line strict
"use strict";

const bcrypt = require("bcrypt");

function keyGenerate() {
  const salt = bcrypt.genSaltSync(512);
  const hash = bcrypt.hashSync(salt, 10);

  console.log(`Yout key is:   ${hash}`);

  return hash;
}

module.exports = keyGenerate;
