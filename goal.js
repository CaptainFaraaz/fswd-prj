// models/Goal.js
const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
  name: { type: String, required: true },
  description: { type: String },
  category: { 
    type: String, 
    enum: ['education', 'wedding', 'house_purchase', 'retirement', 'emergency', 'vacation', 'business', 'other'],
    required: true 
  },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  startDate: { type: Date, default: Date.now },
  deadline: { type: Date, required: true },
  beneficiary: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contributors: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    monthlyAmount: { type: Number, default: 0 },
    totalContributed: { type: Number, default: 0 },
    lastContribution: { type: Date }
  }],
  milestones: [{
    name: { type: String },
    targetAmount: { type: Number },
    achievedDate: { type: Date }
  }],
  status: { 
    type: String, 
    enum: ['active', 'completed', 'paused', 'cancelled'],
    default: 'active' 
  },
  priority: { 
    type: String, 
    enum: ['high', 'medium', 'low'],
    default: 'medium' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Goal', goalSchema);
