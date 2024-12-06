// config/password.js

const bcrypt = require('bcrypt');

async function generatePasswordHash() {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password', salt);
  console.log(hashedPassword);
}

generatePasswordHash();
