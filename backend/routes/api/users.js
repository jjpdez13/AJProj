// backend/routes/api/users.js
const express = require("express");

const bcrypt = require("bcryptjs");

const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

// Sign up
router.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  const hashedPassword = bcrypt.hashSync(password);
  const user = await User.create({ email, username, hashedPassword });

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

// Fetch req for signup a new user
/*

***be sure to add new email***
***be sure to add new username***
***be sure to add new password***

fetch('/api/users', {
  method: 'POST',
  headers: {
    "Content-Type": "application/json",
    "XSRF-TOKEN": `<value of XSRF-TOKEN cookie>`
  },
  body: JSON.stringify({
    email: 'spidey@spider.man',
    username: 'Spidey',
    password: 'password'
  })
}).then(res => res.json()).then(data => console.log(data));
*/

module.exports = router;
