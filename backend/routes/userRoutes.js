import express from 'express'
// import { protect } from '../middleware/authMiddleware.js'
import {
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controllers/userController.js'
import verifyJWT from '../middleware/verifyJWT.js'

const router = express.Router()

router.use(verifyJWT)

router.get('/', getAllUsers)
router.post('/', registerUser)

// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
router.route('/').get(getUserProfile).patch(updateUserProfile)

export default router
