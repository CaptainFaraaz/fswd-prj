// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  avatar: { type: String, default: '' },
  dateOfBirth: { type: Date },
  role: { 
    type: String, 
    enum: ['patriarch', 'matriarch', 'parent', 'young_adult', 'child'],
    default: 'parent'
  },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  relationshipToHead: { type: String },
  permissions: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
