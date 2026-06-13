'use strict';

module.exports = (router) => {
  router.get('/auth/login', (_req, res) => {
    res.send('youre supposed to login here..');
  })
  return router;
}
