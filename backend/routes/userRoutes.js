import express from 'express'
import multer from 'multer'
// import { protect } from '../middleware/authMiddleware.js'
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

// router.use(verifyJWT)

router.get('/', verifyJWT, getAllUsers)
router.post('/', registerUser)

// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
router.route('/').get(getUserProfile).patch(updateUserProfile)

//------ UPLOADING FILE ------------------
// At first we tried implementing this on the controller (might need to do that eventually) but for now we left all logic here

// 3 STEPS
// 1. initialize 'storage' object (destination folder and filename properties)
// 2. initialize 'upload' function from multer storage object
// 3. call upload.single with the 'file'... name should reflect ALL keys

// storage object
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/scottlucas/Desktop/baseball/client/public/assets')
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname)
  },
})

// upload function
const upload = multer({ storage })

// upload is called as middleware
router.post('/upload', upload.single('file'), (req, res) => {
  res.json(req.file)
})

export default router
