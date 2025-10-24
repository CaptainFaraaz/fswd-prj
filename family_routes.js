// routes/family.routes.js
const express = require('express');
const router = express.Router();
const familyController = require('../controllers/familyController');
const { protect, authorize } = require('../middleware/auth.middleware');

router.post('/create', protect, familyController.createFamily);
router.get('/:id', protect, familyController.getFamilyById);
router.get('/:id/dashboard', protect, familyController.getFamilyDashboard);
router.put('/:id/members', protect, authorize(['patriarch', 'matriarch']), familyController.addFamilyMember);
router.delete('/:id/members/:memberId', protect, authorize(['patriarch', 'matriarch']), familyController.removeFamilyMember);
router.put('/:id', protect, authorize(['patriarch', 'matriarch']), familyController.updateFamily);

module.exports = router;
