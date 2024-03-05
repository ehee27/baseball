import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  // ---- STANDARD DATA ---------------------
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
      default: true,
    },
    roles: [
      {
        type: String,
        default: 'User',
      },
    ],
    // --- BASEBALL SPECIFIC -----------------
    position: {
      type: String,
      required: false,
    },
    number: {
      type: Number,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
    },
    bats: {
      type: String,
      required: false,
    },
    throws: {
      type: String,
      required: false,
    },
    hs: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    profilePic: {
      type: String,
      required: false,
    },
    stats: {
      type: Array,
      required: false,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User
