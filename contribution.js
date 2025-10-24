// models/Contribution.js
const mongoose = require('mongoose');

const contributionSchema = new mongoose.Schema({
  goalId: { type: mongoose.Schema.Types.ObjectId, ref: 'Goal', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['upi', 'bank_transfer', 'cash', 'card'],
    required: true 
  },
  transactionId: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'completed', 'failed'],
    default: 'pending' 
  },
  contributionDate: { type: Date, default: Date.now },
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Contribution', contributionSchema);
