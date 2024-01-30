import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from '../controllers/userController.js'
const router = express.Router()

router.get('/', getAllUsers)
router.post('/auth', authUser)
router.post('/', registerUser)
router.post('/logout', logoutUser)

// router
//   .route('/profile')
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile)
router.route('/').get(getUserProfile).patch(updateUserProfile)

export default router
