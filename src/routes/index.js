const Router = require('express-promise-router');
const UserRoute = require('./UserRoute');


const router = new Router();
const apiRouter = new Router();

apiRouter.use('/users', new UserRoute().router);

router.use('/api', apiRouter);

module.exports = router;
