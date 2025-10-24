// controllers/familyController.js
const Family = require('../models/Family');
const User = require('../models/User');
const Goal = require('../models/Goal');

exports.createFamily = async (req, res) => {
  try {
    const { name, familyPhoto } = req.body;
    
    const family = await Family.create({
      name,
      patriarch: req.user.id,
      familyPhoto,
      members: [{
        userId: req.user.id,
        role: 'patriarch',
        relationshipToHead: 'self',
        permissions: ['view_all', 'modify_goals', 'approve_investments', 'manage_members']
      }]
    });

    // Update user's familyId
    await User.findByIdAndUpdate(req.user.id, { 
      familyId: family._id,
      role: 'patriarch'
    });

    res.status(201).json({
      success: true,
      data: family
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getFamilyDashboard = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id)
      .populate('members.userId', 'name email avatar role')
      .populate('patriarch', 'name email avatar');

    const goals = await Goal.find({ familyId: req.params.id })
      .populate('beneficiary', 'name')
      .populate('contributors.userId', 'name avatar');

    const dashboardData = {
      family,
      goals,
      totalWealth: family.totalWealth,
      activeGoals: goals.filter(g => g.status === 'active').length,
      completedGoals: goals.filter(g => g.status === 'completed').length,
      totalGoalAmount: goals.reduce((sum, goal) => sum + goal.targetAmount, 0),
      totalSavedAmount: goals.reduce((sum, goal) => sum + goal.currentAmount, 0)
    };

    res.json({
      success: true,
      data: dashboardData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
