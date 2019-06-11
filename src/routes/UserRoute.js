const Router = require('express-promise-router');
const UserController = require('./../controllers/User');
const middleware = require('./../middleware/middleware');
const multer = require('multer');

/* multer properties */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const fileFilter  = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpp'){
    cb(null, true);
  }else {
    cb(null, false);
  }
}

/* multer properties */

const upload = multer({
  storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
});

class UserRoute {
  get router() {
    const router = new Router();
    router.get('/user-pokemons/', middleware.checkToken, this.getUserWithPokemons);
    router.get('/getUser', middleware.checkToken, this.getUser);
    router.post('/', this.createUser);
    router.post('/login', this.login);
    router.post('/tokenpassword', this.sendTokenForPass);
    router.put('/resetpassword', this.resetPassword);
    router.put('/verifyemail', this.verifyEmail)
    router.put('/updateuser', middleware.checkToken, this.updateUser);
    router.put('/profilephoto', middleware.checkToken, upload.single('profileImage'), this.updateProfilePhoto)
    return router;
  }

  async updateProfilePhoto(req, res) {
    const { id } = req.decoded.data;
    const dest = req.file.destination;
    const destination = dest.substring(2, dest.length);
    const filename = req.file.filename;
    const photoUrl=destination+filename
    const httpResponse = await UserController.updateProfilePhoto(id, photoUrl)
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async deleteAccount(req, res) {
    const httpResponse = await UserController.deleteAccount(req.decoded.data.id);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async updateUser(req, res) {
    const { id } = req.decoded.data;
    const user = req.body.user;
    if(user&&user.picture){
      //Here we stract everything could be added before uploads
      const pic =  user.picture;
      user.picture = pic.substring(pic.indexOf("uploads"));
    }
    const httpResponse = await UserController.updateUser(id, user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getUser(req, res) {
    const { id } = req.decoded.data;
    const httpResponse = await UserController.getUserById(id);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async resetPassword(req, res) {
    const token = req.body.token;
    const password = req.body.password;
    console.log(token, password);
    const httpResponse = await UserController.resetPassword(token, password);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async sendTokenForPass(req, res) {
    const email = req.body.email;
    const httpResponse = await UserController.sendTokenForPass(email);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getUserWithPokemons(req, res) {
    const { id } = req.decoded.data;
    const name=req.query.name;
    const offset=req.query.offset||0;
    const limit=req.query.limit||12;
    const httpResponse = await UserController.getUserWithPokemons(id, name, offset, limit);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async createUser(req, res) {
    const httpResponse = await UserController.addUser(req.body.user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async verifyEmail(req, res) {
    const httpResponse = await UserController.checkEmail(req.body.token);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async login(req, res) {
    const httpResponse = await UserController.login(req.body.user);
    return res.status(httpResponse.status).json(httpResponse.body);
  }

  async getAllUsers(req, res) {
    const httpResponse = await UserController.getAll();
    return res.status(httpResponse.status).json(httpResponse.body);
  }
}


module.exports = UserRoute;
