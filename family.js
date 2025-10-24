// models/Family.js
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  patriarch: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  matriarch: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    role: { type: String, required: true },
    relationshipToHead: { type: String },
    joinedAt: { type: Date, default: Date.now },
    permissions: [{ type: String }]
  }],
  familyPhoto: { type: String },
  totalWealth: { type: Number, default: 0 },
  totalGoals: { type: Number, default: 0 },
  achievedGoals: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Family', familySchema);
