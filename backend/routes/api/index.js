const router = require('express').Router();

const { restoreUser } = require('../../utils/auth.js');

// connect restoreUser to the router
router.use(restoreUser);

// GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: 'definitely-real'
//     }
//   });
//   setTokenCookie(res, user);
//   return res.json({ user: user });
// });

module.exports = router;
