// models/Investment.js
const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['mutual_fund', 'fixed_deposit', 'stocks', 'ppf', 'nps', 'real_estate', 'gold', 'insurance', 'other'],
    required: true 
  },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currentValue: { type: Number },
  purchaseDate: { type: Date, required: true },
  maturityDate: { type: Date },
  returnRate: { type: Number },
  documents: [{ type: String }],
  notes: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
