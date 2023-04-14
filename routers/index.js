const router = require("express").Router()
const PhotoController = require("../controllers/photoController")
const UserController = require('../controllers/userController')
const auth = require("../middlewares/auth")

router.post('/users/register', UserController.register)
router.post('/users/login', UserController.login)

router.use(auth)

router.get('/photos', PhotoController.GetPhotos)
router.get('/photos/:id', PhotoController.GetPhotosById)
router.post('/photos', PhotoController.createPhoto)
router.put('/photos/:id', PhotoController.updatePhoto)
router.delete('/photos/:id', PhotoController.deletePhoto)
// router.use("/photos",photoRouters)

module.exports = router