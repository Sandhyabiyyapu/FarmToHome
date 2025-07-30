const bcrypt = require('bcryptjs');

const plainPassword = 'LocalFarm2Home@1234Sona';

bcrypt.hash(plainPassword, 10, (err, hash) => {
  if (err) {
    console.error("Hashing failed:", err);
  } else {
    console.log("Hashed password:\n", hash);
  }
});
