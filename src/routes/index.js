const Router = require('express-promise-router');
const cors = require('cors');
const UserRoute = require('./UserRoute');
const PokemonRoute = require('./PokemonRoute');

const router = new Router();
const apiRouter = new Router();

apiRouter.use(cors());
apiRouter.use('/users', new UserRoute().router);
apiRouter.use('/pokemons', new PokemonRoute().router);

router.use('/api', apiRouter);

module.exports = router;
