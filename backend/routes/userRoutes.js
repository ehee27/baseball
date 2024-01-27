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

// router.get('/profile', getUserProfile)
// router.put('/profile', updateUserProfile)

// or
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)

export default router
